import express from 'express'
import { signup } from '../controllers/userController.js';

const router  = express.Router();


router.post('/signup',signup);
// router.post('/signin',signin);
// router.post('/google',google);
// router.get('/logout',logOut);

export default router;