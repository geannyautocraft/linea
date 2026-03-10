import { useState, useCallback } from 'react';
import type { Note } from '../types/Note';
import { generateId } from '../utils/generateId';
import { deriveTitle } from '../utils/deriveTitle';
import * as noteStorage from '../services/noteStorage';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => noteStorage.loadNotes());
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  const activeNote = notes.find((n) => n.id === activeNoteId);

  const createNote = useCallback(() => {
    const now = Date.now();
    const note: Note = {
      id: generateId(),
      title: 'Untitled',
      content: '',
      createdAt: now,
      updatedAt: now,
    };
    setNotes((prev) => {
      const updated = [note, ...prev];
      noteStorage.saveNotes(updated);
      return updated;
    });
    setActiveNoteId(note.id);
  }, []);

  const updateNote = useCallback((id: string, content: string) => {
    setNotes((prev) => {
      const updated = prev.map((n) =>
        n.id === id
          ? { ...n, content, title: deriveTitle(content), updatedAt: Date.now() }
          : n,
      );
      noteStorage.saveNotes(updated);
      return updated;
    });
  }, []);

  const deleteNote = useCallback(
    (id: string) => {
      setNotes((prev) => {
        const updated = prev.filter((n) => n.id !== id);
        noteStorage.saveNotes(updated);
        return updated;
      });
      if (activeNoteId === id) {
        setActiveNoteId(() => {
          const remaining = notes.filter((n) => n.id !== id);
          return remaining.length > 0 ? remaining[0].id : null;
        });
      }
    },
    [activeNoteId, notes],
  );

  return {
    notes,
    activeNoteId,
    activeNote,
    createNote,
    updateNote,
    deleteNote,
    setActiveNoteId,
  };
}
