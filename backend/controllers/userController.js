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

// export const signin = async( req, res, next )=>{
//     console.log("inside the login function");
//     const{email , password } = req.body;

//     if (!email || !password || email==="" || password ==="" ) {
//         next(errorHandler(400,"All fields are required!!!"))
//     }

//     try {

//     const validUser = await User.findOne({email});

//     if (!validUser) {
//         next(errorHandler(404,"User not found!!!"))
//     }

//     const validPassword = bcryptjs.compareSync(password,validUser.password);

//     if (!validPassword) {
//         next(errorHandler(404,"Wrong Creditinals!!!"))
//     }

//     const token = jwt.sign(
//         { id: validUser._id } , process.env.JWT_SCERET
//     );

//     const { password: pass, ...rest } = validUser.toObject();

//     res.status(200).cookie('access_token',token,{
//         httpOnly: true,
//     })
//     json(res)
        
//     } catch (error) {
//         next(error)
//     }
// }

export const signin = async (req, res, next) => {
    console.log("inside the login function");

    const jwtsecrt = process.env.JWT_SECRET;
      console.log("seceret is :",jwtsecrt);
      console.log(req.body);
    const { email, password } = req.body;
  
    if (!email || !password || email === "" || password === "") {
      return next(errorHandler(400, "All fields are required!!!"));
    }
  
    try {
      const validUser = await User.findOne({ email });
  
      if (!validUser) {
        return next(errorHandler(404, "User not found!!!"));
      }
  
      const validPassword = bcryptjs.compareSync(password, validUser.password);
  
      if (!validPassword) {
        return next(errorHandler(404, "Wrong Credentials!!!"));
      }
      
  
      const token = jwt.sign(
        { id: validUser._id }, 
        process.env.JWT_SECRET
      );
  
      const { password: pass, ...rest } = validUser.toObject();
  
      res.status(200)
        .cookie('access_token', token, { httpOnly: true })
        .json(rest); // Correctly send JSON response
  
    } catch (error) {
      next(error);
    }
  };
  