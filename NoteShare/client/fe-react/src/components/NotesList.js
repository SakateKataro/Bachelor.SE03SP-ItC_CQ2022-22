import React, { useEffect, useState } from "react";
import { getNotes } from "../services/apiService";

const NotesList = ({ onSelectNote }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem("token");
      try {
        const { data } = await getNotes(token);
        setNotes(data.notes);
      } catch (error) {
        alert("Failed to fetch notes.");
      }
    };
    fetchNotes();
  }, []);

  return (
    <div>
      <h2>Your Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.title}
            <button onClick={() => onSelectNote(note)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
