import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();

// use the middleware cors next
app.use(cors());

// invoking the dotenv
dotenv.config();

// starting the server
const port = process.env.PORT || 5000;

// sample route
app.get('/',(req, res) =>{
    res.status(200).json("hellow world");
})

app.listen(port, () => {
    console.log('Server is running on http://localhost:3000');
  });