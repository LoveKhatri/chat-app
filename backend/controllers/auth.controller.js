import User from "../models/user.model.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateJWT.js";

dotenv.config();

export const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePicture: user.profilePicture,
        });

    } catch (error) {
        console.log("Login Error: ", error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

export const signUpController = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Password and Confirm Password do not match" });
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }


        // ! Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const profilePicURL = process.env.AVATAR_API_URL + `${gender === "male" ? "/boy" : "/girl"}?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePicture: profilePicURL
        })

        if (newUser) {
            // GENERATE JWT TOKEN
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePicture: newUser.profilePicture,
            });
        } else {
            res.status(400).json({ error: "User not created" });
        }

    } catch (error) {
        console.log("SignUp Error: ", error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

export const logoutController = (req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({ message: "Logged out" });
    } catch (error) {
        console.log("Logout Error: ", error);
        res.status(500).json({ error: "Something went wrong" });
    }
}