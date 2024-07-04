import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use("/api/auth", authRouter)

app.listen(PORT, () => {
    console.log('Server is running on PORT:' + PORT);
});