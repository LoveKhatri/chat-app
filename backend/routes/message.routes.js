import express from 'express';
import { sendMessageController ,getMessageController} from '../controllers/message.controller.js';
import protectRoute from '../middlewares/protectRoute.js';
const messageRouter = express.Router();

Router.get('/:id', protectRoute, getMessageController)
Router.post('/send/:id', protectRoute, sendMessageController)

export default messageRouter;