import { useState, useMemo } from 'react';
import type { Note } from '../types/Note';
import { useDebounce } from './useDebounce';
import { filterNotes } from '../utils/filterNotes';

export function useNoteSearch(notes: Note[]) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const applyQuery = useDebounce((value: string) => {
    setDebouncedQuery(value);
  }, 200);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    applyQuery(value);
  };

  const filtered = useMemo(
    () => filterNotes(notes, debouncedQuery),
    [notes, debouncedQuery],
  );

  return { query, setQuery: handleQueryChange, filtered };
}
