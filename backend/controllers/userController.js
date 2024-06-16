import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup  = async ( req, res , next ) =>{
    console.log("inside the user signup");

    const{username , password , email } = req.body;

    const hashedPass = bcryptjs.hashSync(password , 10);

    const existingUser =  await User.findOne({email});
    if(existingUser){
        return next( errorHandler(404," User already Exists"));
    }

    const newUser = new User({
        username,
        email,
        password: hashedPass
    });

    try {
        await newUser.save();
        res.json({success: true, message:"Sign-Up Successfull"});
    } catch (error) {
        next(error)
    }
}