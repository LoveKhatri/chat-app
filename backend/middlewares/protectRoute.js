import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user.model.js';
dotenv.config();

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ error: "You need to be logged in" })
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET)

        if (!verified) {
            return res.status(401).json({ error: "You need to be logged in" })
        }

        const user = await User.findById(verified.id)
        if (!user) {
            return res.status(401).json({ error: "User not found" })
        }

        req.user = user
        next()
        return;
    } catch (error) {
        console.log("Protect Route Error: ", error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

export default protectRoute;