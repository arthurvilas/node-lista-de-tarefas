const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name must be provided."], // More complete than just required: true
        trim: true,
        maxlength: [20, "Name cannot be bigger than 20 characters"]
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Task', TaskSchema);