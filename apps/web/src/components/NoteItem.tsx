import { memo } from 'react';
import type { Note } from '../types/Note';

interface NoteItemProps {
  note: Note;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

function getPreview(content: string): string {
  const lines = content.split('\n');
  const secondLine = lines.slice(1).find((l) => l.trim() !== '');
  return secondLine?.trim() || '';
}

export const NoteItem = memo(function NoteItem({
  note,
  isActive,
  onClick,
  onDelete,
}: NoteItemProps) {
  const preview = getPreview(note.content);

  return (
    <div
      className={`sidebar-item${isActive ? ' sidebar-item--active' : ''}`}
      onClick={onClick}
    >
      <div className="sidebar-item-title">{note.title}</div>
      <div className="sidebar-item-meta">
        <span className="sidebar-item-date">{formatDate(note.updatedAt)}</span>
        {preview && <span className="sidebar-item-preview">{preview}</span>}
      </div>
      <button
        className="sidebar-item-delete"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        aria-label="Delete note"
      >
        &times;
      </button>
    </div>
  );
});
