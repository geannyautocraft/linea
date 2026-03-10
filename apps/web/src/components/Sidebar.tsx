import type { Note } from '../types/Note';
import { NoteItem } from './NoteItem';

interface SidebarProps {
  notes: Note[];
  activeNoteId: string | null;
  onSelectNote: (id: string) => void;
  onCreateNote: () => void;
  onDeleteNote: (id: string) => void;
}

export function Sidebar({
  notes,
  activeNoteId,
  onSelectNote,
  onCreateNote,
  onDeleteNote,
}: SidebarProps) {
  const sorted = [...notes].sort((a, b) => b.updatedAt - a.updatedAt);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-title">Linea</span>
        <button className="sidebar-new" onClick={onCreateNote}>
          + New
        </button>
      </div>
      <div className="sidebar-list">
        {sorted.length === 0 ? (
          <div className="sidebar-empty">No notes yet</div>
        ) : (
          sorted.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              isActive={note.id === activeNoteId}
              onClick={() => onSelectNote(note.id)}
              onDelete={() => onDeleteNote(note.id)}
            />
          ))
        )}
      </div>
    </aside>
  );
}
