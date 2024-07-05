import express from 'express';
import protectRoute from '../middlewares/protectRoute';

const userRouter = express.Router();

userRouter.get("/", protectRoute, getUsersForSidebar);

export default userRouter;