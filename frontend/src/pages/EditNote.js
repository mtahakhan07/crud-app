import React, { useState, useEffect } from "react";
import { updateNote } from "../api";

const EditNote = ({ note, onUpdate, onCancel }) => {
    const [title, setTitle] = useState(note?.title || "");
    const [content, setContent] = useState(note?.content || "");

    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
        }
    }, [note]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !content) return alert("Both fields are required!");

        try {
            await updateNote(note._id, { title, content });
            onUpdate(); // Refresh the notes list
            onCancel(); // Close edit form
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };

    return (
        <div style={styles.modal}>
            <h2>Edit Note</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={styles.input}
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    style={styles.textarea}
                />
                <button type="submit" style={styles.button}>Save Changes</button>
                <button type="button" onClick={onCancel} style={{ ...styles.button, backgroundColor: "gray" }}>Cancel</button>
            </form>
        </div>
    );
};

const styles = {
    modal: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
        width: "300px",
    },
    input: {
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
    },
    textarea: {
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        minHeight: "100px",
    },
    button: {
        padding: "8px 15px",
        marginRight: "10px",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#007bff",
        color: "white",
        cursor: "pointer",
    },
};

export default EditNote;
