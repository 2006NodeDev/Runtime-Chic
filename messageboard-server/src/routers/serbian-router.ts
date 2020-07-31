import express, { Request, Response, NextFunction } from 'express';
import { getSerbianMessages } from '../dao/board-dao';

export const serbianRouter = express.Router();

serbianRouter.get('/', async (req:Request, res:Response, next:NextFunction)=>{
    let messages = await getSerbianMessages();
    res.json(messages);
})