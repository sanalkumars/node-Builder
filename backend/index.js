import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoute.js';
const app = express();

// use the middleware cors next
const corsOptions = {
    origin: 'http://localhost:5173', // Specify the origin you want to allow
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true, // Include credentials in CORS requests
  };
  
  app.use(cors(corsOptions));
  
  app.use(express.json())

  // routes for user
app.use('/api/user', userRoutes)

// invoking the dotenv
dotenv.config();

// starting the server
const port = process.env.PORT || 5000;

// sample route
app.get('/',(req, res) =>{
    res.status(200).json("hellow world");
})


mongoose.connect("mongodb://127.0.0.1:27017/Note_Builder")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect to mongodb");
})

app.listen(port, () => {
    console.log('Server is running on http://localhost:3000');
  });




app.use((err,req,res,next) => {

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});
