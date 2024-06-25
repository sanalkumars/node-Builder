import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
        
      },
      
}, { timestamps: true });

// creating the model
const Note = mongoose.model('Note',noteSchema);

export default Note;