import React, { useState } from "react";
import AuthForm from "./components/AuthForm";
import NotesList from "./components/NotesList";
import NoteEditor from "./components/NoteEditor";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [selectedNote, setSelectedNote] = useState(null);

  if (!isAuthenticated) {
    return <AuthForm onAuthSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div>
      {selectedNote ? (
        <NoteEditor
          note={selectedNote}
          onSave={() => setSelectedNote(null)}
        />
      ) : (
        <NotesList onSelectNote={(note) => setSelectedNote(note)} />
      )}
    </div>
  );
};

export default App;
