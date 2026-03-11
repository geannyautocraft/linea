import type { Note } from '../types/Note';

export function filterNotes(notes: Note[], query: string): Note[] {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return notes;

  return notes.filter(
    (note) =>
      note.title.toLowerCase().includes(trimmed) ||
      note.content.toLowerCase().includes(trimmed),
  );
}
