import React, { useState, useEffect } from "react";
import { createNote, updateNote } from "../api";

const NoteForm = ({ selectedNote, clearSelection }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (selectedNote) {
            setTitle(selectedNote.title);
            setContent(selectedNote.content);
        }
    }, [selectedNote]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedNote) {
            await updateNote(selectedNote._id, { title, content });
        } else {
            await createNote({ title, content });
        }
        setTitle("");
        setContent("");
        clearSelection();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit">{selectedNote ? "Update" : "Add"} Note</button>
            {selectedNote && <button onClick={clearSelection}>Cancel</button>}
        </form>
    );
};

export default NoteForm;
