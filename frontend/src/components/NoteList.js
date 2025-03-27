import React, { useEffect, useState } from "react";
import { getNotes, deleteNote } from "../api";
import NoteItem from "./NoteItem";

const NoteList = ({ onEdit }) => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const { data } = await getNotes();
            setNotes(data);
        } catch (error) {
            console.error("Error fetching notes", error);
        }
    };

    const handleDelete = async (id) => {
        await deleteNote(id);
        fetchNotes(); // Refresh list
    };

    return (
        <div>
            <h2>Notes</h2>
            {notes.map((note) => (
                <NoteItem key={note._id} note={note} onEdit={onEdit} onDelete={handleDelete} />
            ))}
        </div>
    );
};

export default NoteList;
