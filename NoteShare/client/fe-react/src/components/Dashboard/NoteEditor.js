import React, { useState } from "react";
import { createNote } from "../../services/apiService";
import { encryptNote } from "../../utils/crypto";

const NoteEditor = ({ onSave }) => {
  const [note, setNote] = useState("");
  const [key, setKey] = useState("");

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const encryptedNote = encryptNote(note, key);
    try {
      await createNote({ content: encryptedNote }, token);
      onSave();
    } catch (error) {
      alert("Failed to save note.");
    }
  };

  return (
    <div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your note..."
      />
      <input
        type="password"
        placeholder="Encryption Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <button onClick={handleSave}>Save Note</button>
    </div>
  );
};

export default NoteEditor;
