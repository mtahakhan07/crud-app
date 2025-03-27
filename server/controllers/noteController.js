const Note = require("../models/note");

const getNotes = async (req, res) => {
    try {
        // Only return notes for the logged-in user
        const notes = await Note.find({ user: req.userId });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getNoteById = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, user: req.userId });
        if (!note) return res.status(404).json({ message: "Note not found" });
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createNote = async (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content,
        user: req.userId // Associate note with user
    });

    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateNote = async (req, res) => {
    try {
        // Only update if the note belongs to the user
        const updatedNote = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            req.body,
            { new: true }
        );
        if (!updatedNote) return res.status(404).json({ message: "Note not found or unauthorized" });
        res.json(updatedNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteNote = async (req, res) => {
    try {
        // Only delete if the note belongs to the user
        const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, user: req.userId });
        if (!deletedNote) return res.status(404).json({ message: "Note not found or unauthorized" });
        res.json({ message: "Note deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
};
