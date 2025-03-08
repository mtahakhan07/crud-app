const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const { getNotes, getNoteById, createNote, updateNote, deleteNote } = require("./controllers/noteController");

// Load environment variables
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/notes", getNotes);
app.get("/notes/:id", getNoteById);
app.post("/notes", createNote);
app.put("/notes/:id", updateNote);
app.delete("/notes/:id", deleteNote);

// Connect to Database
connectToDb();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
