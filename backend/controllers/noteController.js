import Note from "../models/noteModel.js";
import { errorHandler } from "../utils/error.js";


export const createNote = async (req, res, next) => {
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Please provide all required fields'));
    }

    const existingNote = await Note.findOne({title:req.body.title});

    if (existingNote) {
        return next(errorHandler(404, " Note by this title  already Exists"));
    }else{
        const newNote = new Note({
            userId: req.user.id,
            title: req.body.title,
            content: req.body.content,
        });
    
        try {
            const savedData = await newNote.save();
            res.status(201).json({ message: "saved the note successfully", savedData });
        } catch (error) {
            next(error);
        }
    }

}


export const getNotes = async (req, res, next) => {
    const userId = req.user.id; 
    if (!userId) {
        return res.status(400).json({ message: "User not found" });
    }

    try {
        const notes = await Note.find({ userId });
        res.status(200).json({ message: "Notes fetched successfully", notes });
    } catch (error) {
        next(error);
    }
};


export const deleteNote = async(req , res , next) => {
    const noteID = req.params.Id;   
console.log(1);
    try {
        const deletedNote = await Note.findByIdAndDelete(noteID);
        if (deletedNote) {
            res.status(200).json({message:"Note Deleted successfully"});
        } else {
            res.status(404).json({ message: "Note not found" });
        }
    } catch (error) {
        next(error)
    }
}