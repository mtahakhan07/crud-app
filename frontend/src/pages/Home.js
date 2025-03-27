import React, { useState, useEffect } from "react";
import NoteList from "../components/NoteList";
import NoteForm from "../components/NoteForm";
import EditNote from "./EditNote";
import { getNotes, createNote, updateNote } from "../api";

const Home = () => {
    const [notes, setNotes] = useState([]);  // Store notes
    const [selectedNote, setSelectedNote] = useState(null);

    // Fetch notes when the component loads
    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const { data } = await getNotes();
            setNotes(data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    const handleCreateNote = async (newNote) => {
        try {
            await createNote(newNote);
            fetchNotes();  // Refresh notes after adding
        } catch (error) {
            console.error("Error creating note:", error);
        }
    };

    const handleUpdateNote = async (updatedNote) => {
        try {
            await updateNote(updatedNote._id, updatedNote);
            fetchNotes();  // Refresh notes after editing
            setSelectedNote(null);
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };

    const handleDeleteNote = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/notes/${id}`, { method: "DELETE" });
            if (response.ok) {
                fetchNotes();  // Refresh notes after deleting
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    return (
        <div>
            {!selectedNote ? (
                <NoteForm
                    onCreate={handleCreateNote}
                    clearSelection={() => { }}
                />
            ) : (
                <EditNote
                    note={selectedNote}
                    onUpdate={handleUpdateNote}
                    onCancel={() => setSelectedNote(null)}
                />
            )}

            <NoteList notes={notes} onEdit={setSelectedNote} onDelete={handleDeleteNote} />
        </div>
    );
};

export default Home;
