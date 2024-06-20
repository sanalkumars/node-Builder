import express from 'express'
import { signin, signup } from '../controllers/userController.js';


const router  = express.Router();


router.post('/signup',signup);
router.post('/login',signin);

// router.post('/google',google);
// router.get('/logout',logOut);

export default router;