import React, { useState } from "react";
import AuthForm from "./components/UserAuthentication/AuthForm";
import NotesList from "./components/Dashboard/NotesList";
import NoteEditor from "./components/Dashboard/NoteEditor";

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
