import express from 'express'
import { createNote, getNotes } from '../controllers/noteController.js';
import { verifyToken } from '../utils/verifyUser.js';



const router = express.Router();


router.post('/createnote',verifyToken, createNote);
router.get('/getNotes',verifyToken, getNotes);

export default router
