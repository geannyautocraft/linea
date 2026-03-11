import type { Note } from '../types/Note';
import { NoteItem } from './NoteItem';
import { useNoteSearch } from '../hooks/useNoteSearch';

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
  const { query, setQuery, filtered } = useNoteSearch(notes);
  const sorted = [...filtered].sort((a, b) => b.updatedAt - a.updatedAt);
  const hasNotes = notes.length > 0;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-title">Linea</span>
        <button className="sidebar-new" onClick={onCreateNote}>
          + New
        </button>
      </div>
      {hasNotes && (
        <div className="sidebar-search">
          <input
            className="sidebar-search-input"
            type="text"
            placeholder="Search notes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      )}
      <div className="sidebar-list">
        {!hasNotes ? (
          <div className="sidebar-empty">No notes yet</div>
        ) : sorted.length === 0 ? (
          <div className="sidebar-empty">No notes found</div>
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
