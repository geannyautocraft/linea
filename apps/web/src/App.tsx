import { useNotes } from './hooks/useNotes';
import { Sidebar } from './components/Sidebar';
import { Editor } from './components/Editor';

function App() {
  const {
    notes,
    activeNoteId,
    activeNote,
    createNote,
    updateNote,
    deleteNote,
    setActiveNoteId,
  } = useNotes();

  return (
    <div className="app">
      <Sidebar
        notes={notes}
        activeNoteId={activeNoteId}
        onSelectNote={setActiveNoteId}
        onCreateNote={createNote}
        onDeleteNote={deleteNote}
      />
      <Editor note={activeNote} onUpdateNote={updateNote} />
    </div>
  );
}

export default App;
