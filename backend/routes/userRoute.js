import express from 'express'
import { signin, signup,google, logOut } from '../controllers/authController.js';

const router  = express.Router();


router.post('/signup',signup);
router.post('/signin',signin);
// router.post('/google',google);
router.get('/logout',logOut);

export default router;