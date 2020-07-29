import { Response, NextFunction} from "express";
import jwt from 'jsonwebtoken'


export const JWTVerifyMiddleware = (req: any, res: Response, Next: NextFunction) => {
    try {
        let token = req.headers.authorization?.split(' ').pop()//turn the string Bearer token -> token
        if(token){
            req.user = jwt.verify(token, 'thisIsASecret')
            console.log(`token: ${token}`);
            
        }
        Next()
    } catch (e) {
        console.log(e);
        Next(e)
    }
}