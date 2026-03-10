import type { Note } from '../types/Note';

const STORAGE_KEY = 'linea-notes';

export function loadNotes(): Note[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as Note[];
  } catch {
    return [];
  }
}

export function saveNotes(notes: Note[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export function saveNote(notes: Note[], note: Note): Note[] {
  const index = notes.findIndex((n) => n.id === note.id);
  const updated = index >= 0
    ? notes.map((n) => (n.id === note.id ? note : n))
    : [note, ...notes];
  saveNotes(updated);
  return updated;
}

export function deleteNote(notes: Note[], id: string): Note[] {
  const updated = notes.filter((n) => n.id !== id);
  saveNotes(updated);
  return updated;
}
