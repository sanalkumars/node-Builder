import express from 'express'
import { createNote, deleteNote, getNotes } from '../controllers/noteController.js';
import { verifyToken } from '../utils/verifyUser.js';



const router = express.Router();


router.post('/createnote',verifyToken, createNote);
router.get('/getNotes',verifyToken, getNotes);
router.delete('/deleteNote/:Id', deleteNote);

export default router
