import express, { Request, Response } from 'express';
import { loggingMiddleWare } from './middleware/logging-middleware';
import { corsFilter } from './middleware/cors-filter';
import { boardRouter } from './routers/board-router';
import { ukrainianRouter } from './routers/ukrainian-router';
import { JWTVerifyMiddleware } from './middleware/jwt-verified-middleware';

const app = express();

app.use(express.json({limit:'50mb'}));

app.use(loggingMiddleWare);

app.use(corsFilter);

app.use(JWTVerifyMiddleware);

app.use('/board', boardRouter);

app.use('/ukrainian', ukrainianRouter);

app.get('/health', (req:Request, res:Response)=>{
    res.sendStatus(200);
})

app.listen(2007, ()=> console.log('MessageBoard Server started...'));