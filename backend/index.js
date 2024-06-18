import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoute.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const jwtsec=process.env.JWT_SECRET
console.log("secert is =",jwtsec);
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.status(200).json("Hello World");
});

mongoose.connect("mongodb://127.0.0.1:27017/Note_Builder")
    .then(() => {
        console.log("mongodb connected");
    })
    .catch((error) => {
        console.log("failed to connect to mongodb", error);
    });

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});
