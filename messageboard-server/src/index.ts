import express, { Request, Response } from 'express';
import { loggingMiddleWare } from './middleware/logging-middleware';
import { corsFilter } from './middleware/cors-filter';
import { boardRouter } from './routers/board-router';
import { JWTVerifyMiddleware } from './middleware/jwt-verified-middleware';
import { serbianRouter } from './routers/serbian-router';
import { logger, errorLogger } from './util/loggers';

const app = express();
const basePath = '/message-board' || '' 
const basePathRouter = express.Router();

app.use(express.json({limit:'50mb'}));

app.use(loggingMiddleWare);

app.use(corsFilter);

app.use(JWTVerifyMiddleware);

app.use(basePath, basePathRouter);

basePathRouter.use('/board', boardRouter);

basePathRouter.use('/serbian', serbianRouter);

app.get('/health', (req:Request, res:Response)=>{
    res.sendStatus(200);
})

app.listen(2007, ()=> {
    logger.info(`MessageBoard server has started`) 
});

process.on('uncaughtException', err => {
    logger.fatal(`Uncaught Exception: ${err.message} ${err.stack}`)
    errorLogger.fatal(`Uncaught Exception: ${err.message} ${err.stack}`)
    process.exit(1)
})