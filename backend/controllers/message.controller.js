import User from "../models/user.model.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateJWT.js";
import Conversation from "../models/conversation.model.js";
dotenv.config();

export const sendMessageController = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId]
            }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            message: message,
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([newMessage.save(), conversation.save()]);

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("Send Message Error: ", error);
        res.status(500).json({ error: "Something went wrong" });
    }
}

export const getMessageController = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId]
            }
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json([])
        }

        res.status(200).json(conversation.messages)

    } catch (error) {
        console.log("Get Message Error: ", error);
        res.status(500).json({ error: "Something went wrong" });
    }
}