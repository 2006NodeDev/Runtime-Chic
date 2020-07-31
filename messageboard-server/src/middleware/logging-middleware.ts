import { Request, Response, NextFunction } from "express";
import { logger } from "../util/loggers";

export function loggingMiddleWare(req:Request, res:Response, next:NextFunction){
    logger.debug(`${req.method} Request from ${req.ip} to ${req.path}`)
    next() 
}