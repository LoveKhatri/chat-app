import express from 'express';
import protectRoute from '../middlewares/protectRoute';
import { getUsersForSidebar } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get("/", protectRoute, getUsersForSidebar);

export default userRouter;