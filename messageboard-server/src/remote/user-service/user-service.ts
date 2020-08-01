import { logger } from "../../util/loggers";
import { userServiceBaseClient } from '.';
import { User } from "../../models/user";


export const userService = async (userId:number) => {
    try{
        let result = await userServiceBaseClient.get(`/users/${userId}`, {
            // headers:{
            //     'Authorization': token
            // }
        })
        logger.debug(`userService result ${result.data}`);
        return result.data
    }catch(error){
        logger.error(error);
        let defaultUser = new User()
        defaultUser.userId = userId
        return defaultUser
    }
}