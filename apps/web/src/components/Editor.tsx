import { useState, useEffect, useRef } from 'react';
import type { Note } from '../types/Note';
import { useDebounce } from '../hooks/useDebounce';
import { deriveTitle } from '../utils/deriveTitle';

interface EditorProps {
  note: Note | undefined;
  onUpdateNote: (id: string, content: string) => void;
}

export function Editor({ note, onUpdateNote }: EditorProps) {
  const [value, setValue] = useState('');
  const pendingRef = useRef<{ id: string; content: string } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const debouncedSave = useDebounce((id: string, content: string) => {
    onUpdateNote(id, content);
    pendingRef.current = null;
  }, 500);

  // Sync local state when switching notes, flush pending save
  useEffect(() => {
    if (pendingRef.current) {
      onUpdateNote(pendingRef.current.id, pendingRef.current.content);
      pendingRef.current = null;
    }
    setValue(note?.content ?? '');
    textareaRef.current?.focus();
  }, [note?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!note) {
    return (
      <div className="editor">
        <div className="editor-empty">
          <p className="editor-empty-text">Start writing...</p>
          <p className="editor-empty-hint">Create a new note to get started</p>
        </div>
      </div>
    );
  }

  const title = deriveTitle(value);

  return (
    <div className="editor">
      <div className="editor-container">
        <div className="editor-title">{title}</div>
        <textarea
          ref={textareaRef}
          className="editor-textarea"
          value={value}
          onChange={(e) => {
            const content = e.target.value;
            setValue(content);
            pendingRef.current = { id: note.id, content };
            debouncedSave(note.id, content);
          }}
          autoFocus
          placeholder="Start writing..."
        />
      </div>
    </div>
  );
}
