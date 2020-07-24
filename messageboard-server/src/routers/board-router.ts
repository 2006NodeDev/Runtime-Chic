import express, { Request, Response, NextFunction } from 'express';
import { Message } from '../models/message';
// import { postMessage, getMessages } from '../dao/SQL/board-dao';
import { getMessages, postMessage } from '../dao/SQL/fakeDao'

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
//     "message": "This is a new message! Did i make it?"
// }

boardRouter.post('/',  async (req:Request, res:Response, next:NextFunction) => {
    try {
        let message = new Message();
        
        message.userId = req.body.userId
        message.title = req.body.title
        message.message = req.body.message

        let newDate = new Date();
        // let timestamp = newDate.getTime();
        let second = newDate.getSeconds();
        let minute = newDate.getMinutes();
        let hour = newDate.getHours();
        let day = newDate.getDay();
        let month = newDate.getMonth();
        let year = newDate.getFullYear();
        let time = `${year}-${month}-${day} ${hour}:${minute}:${second}`
        console.log(`time: ${time}`);
        
        message.date = time;

        // temp for testing
        let rand = Math.floor(Math.random()*10);
        message.messageId = rand;
        let newMessage:Message[];
        newMessage = await postMessage(message)
        res.json(newMessage)

    } catch (error) {
        next(error);
    }
})