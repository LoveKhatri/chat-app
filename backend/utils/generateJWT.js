import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "10d" });
    return token;
}

const setCookie = (token, res) => {
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
    });
}

const generateTokenAndSetCookie = (userId, res) => {
    const token = generateToken(userId);
    setCookie(token, res);
}

export default generateTokenAndSetCookie;