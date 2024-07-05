import express from 'express';
import { sendMessageController ,getMessageController} from '../controllers/message.controller.js';
import protectRoute from '../middlewares/protectRoute.js';

const messageRouter = express.Router();

messageRouter.get('/:id', protectRoute, getMessageController)
messageRouter.post('/send/:id', protectRoute, sendMessageController)

export default messageRouter;