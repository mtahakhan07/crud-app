import React from "react";

const NoteItem = ({ note, onEdit, onDelete }) => {
    return (
        <div style={styles.noteCard}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => onEdit(note)} style={styles.button}>Edit</button>
            <button onClick={() => onDelete(note._id)} style={{ ...styles.button, backgroundColor: "red" }}>Delete</button>
        </div>
    );
};

const styles = {
    noteCard: {
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
        margin: "10px 0",
        boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
    },
    button: {
        margin: "5px",
        padding: "5px 10px",
        cursor: "pointer",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#007bff",
        color: "white",
    },
};

export default NoteItem;
