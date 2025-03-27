const mongoose = require("mongoose");

const { Schema } = mongoose;

const noteSchema = new Schema({
    title: String,
    content: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
