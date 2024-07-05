import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';
import messageRouter from './routes/message.routes.js';
import userRouter from './routes/user.routes.js';
import connectToMongoDB from './db/index.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

app.use("/api/auth", authRouter)
app.use("/api/message", messageRouter)
app.use("/api/users", userRouter)

app.listen(PORT, () => {
    connectToMongoDB();
    console.log('Server is running on PORT:' + PORT);
});