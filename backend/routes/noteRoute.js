import express from 'express'
import { createNote, deleteNote, getNotes, updateNote } from '../controllers/noteController.js';
import { verifyToken } from '../utils/verifyUser.js';



const router = express.Router();


router.post('/createnote',verifyToken, createNote);
router.get('/getNotes',verifyToken, getNotes);
router.delete('/deleteNote/:Id',verifyToken, deleteNote);
router.put('/updateNote/:Id',verifyToken, updateNote);


export default router
