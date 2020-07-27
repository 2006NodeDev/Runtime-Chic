import express, { Request, Response, NextFunction } from 'express';
import { getUkrainianMessages } from '../dao/SQL/fakeDao';

export const ukrainianRouter = express.Router();

ukrainianRouter.get('/', async (req:Request, res:Response, next:NextFunction)=>{
    let messages = await getUkrainianMessages();
    res.json(messages)
})