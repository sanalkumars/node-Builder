import express from 'express'
import { signin, signout, signup } from '../controllers/userController.js';


const router  = express.Router();


router.post('/signup',signup);
router.post('/login',signin);
router.post('/signout',signout);

// router.post('/google',google);
// router.get('/logout',logOut);

export default router;