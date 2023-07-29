const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    note: {
        type: String,
        required: [true, "Enter your Note"],
        minlength: 5,
        trim: true
    }
})

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
