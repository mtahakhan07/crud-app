const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const { getNotes, getNoteById, createNote, updateNote, deleteNote } = require("./controllers/noteController");
const { register, login, logout } = require("./controllers/authController");
const auth = require("./middleware/auth");

// Load environment variables
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectToDb();

// Auth Routes (unprotected)
app.post("/api/auth/register", register);
app.post("/api/auth/login", login);
app.post("/api/auth/logout", auth, logout);

// Protected Note Routes
app.get("/api/notes", auth, getNotes);
app.get("/api/notes/:id", auth, getNoteById);
app.post("/api/notes", auth, createNote);
app.put("/api/notes/:id", auth, updateNote);
app.delete("/api/notes/:id", auth, deleteNote);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
