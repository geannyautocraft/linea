import { useState, useEffect, useRef } from 'react';
import type { Note } from '../types/Note';
import { useDebounce } from '../hooks/useDebounce';

interface EditorProps {
  note: Note | undefined;
  onUpdateNote: (id: string, content: string) => void;
}

export function Editor({ note, onUpdateNote }: EditorProps) {
  const [value, setValue] = useState('');
  const pendingRef = useRef<{ id: string; content: string } | null>(null);

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
  }, [note?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!note) {
    return (
      <div className="editor">
        <div className="editor-empty">Create a note to get started</div>
      </div>
    );
  }

  return (
    <div className="editor">
      <textarea
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
  );
}
