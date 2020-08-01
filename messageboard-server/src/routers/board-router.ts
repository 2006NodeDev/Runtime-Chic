import express, { Request, Response, NextFunction } from 'express';
import { Message } from '../models/message';
import { getMessages, postSerbianMessage, postMessage } from '../dao/board-dao';
import { publishMessage } from '../messaging/index';
import { getTextToTranslate } from '../service/translation-service';
import { logger } from '../util/loggers';
import { userService } from '../remote/user-service/user-service';

export const boardRouter = express.Router();

boardRouter.get('/', async (req:Request, res:Response, next:NextFunction)=>{
    try {
        let messages = await getMessages();

        res.json(messages);
    } catch (error) {
        next(error);
    }
})

// for a postman post you can use this:
// {
//     "userId":3,
//     "title":"new message from postman",
//     "message": "This is a new message! Did i make it?",
//     "email" : "runtime.sheek@gmail.com"
// }

boardRouter.post('/',  async (req:Request, res:Response, next:NextFunction) => {
    try {
        let message = new Message();
        
        message.userId = req.body.userId
        message.title = req.body.title
        message.message = req.body.message

        //User data from react post
        message.email = req.body.email

        //Auto-set date
        // let newDate = new Date();
        // let second = newDate.getSeconds();
        // let minute = newDate.getMinutes();
        // let hour = newDate.getHours();
        // let day = newDate.getDay();
        // let month = newDate.getMonth();
        // let year = newDate.getFullYear();
        // let time = `${year}-${month}-${day} ${hour}:${minute}:${second}`
        // logger.debug(`time: ${time}`);
        // message.date = time;

        // temp for testing
        let rand = Math.floor(Math.random()*10);
        message.messageId = rand;

        let newMessage:Message;
        newMessage = await postMessage(message)

        let email = await userService(newMessage.userId)
        logger.debug(`email from userService: ${email}`)
        newMessage.email = email;
        
        // // pub/sub
        publishMessage(newMessage);

        // // return message as result
        res.json(newMessage)

        //translator
        let translated:Message = await getTextToTranslate(newMessage);
        logger.debug(`returned translated message id: ${translated.messageId}`)

        await postSerbianMessage(translated);

    } catch (error) {
        next(error);
    }
})