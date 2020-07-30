import { logger } from "../../util/loggers";
import { userServiceBaseClient } from '.';
import { User } from "../../models/user";

export const userService = async (userId:number, token:string) => {
    try{
        let user = await userServiceBaseClient.get(`/users/${userId}`, {
            headers:{
                'Authorization': token
            }
        })
        return user
    }catch(error){
        logger.error(error);
        let defaultUser = new User()
        defaultUser.userId = userId
        return defaultUser
    }
}