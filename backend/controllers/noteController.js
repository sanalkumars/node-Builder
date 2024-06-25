import Note from "../models/noteModel.js";


export const createNote = async (req, res, next) => {

    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Please provide all required fields'));
    }

    const newNote = new Note({
        userId: req.user.id,
        content: req.body.content,
        title: req.body.title,
    });

    try {

        const savedData = await newNote.save();
        res.status(201).json({ message: "saved the note successfully", savedData });

    } catch (error) {
        next(error);
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

