import { Response, NextFunction} from "express";
import jwt from 'jsonwebtoken'
import { logger } from "../util/loggers";


export const JWTVerifyMiddleware = (req: any, res: Response, Next: NextFunction) => {
    try {
        let token = req.headers.authorization?.split(' ').pop()//turn the string Bearer token -> token
        if(token){
            req.user = jwt.verify(token, 'thisIsASecret')
            logger.debug(`token: ${token}`);
        }
        Next()
    } catch (e) {
        logger.error(e);
        Next(e)
    }
}