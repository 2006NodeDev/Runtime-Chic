import { logger } from "../../util/loggers";
import { userServiceBaseClient } from '.';
import { User } from "../../models/user";


export const userService = async (userId:number, token:string) => {
    try{
        let result = await userServiceBaseClient.get(`/api/users/${userId}`, {
            headers:{
                'jwt_token': token
            }
        })
        logger.debug(`userService result ${result.data}`);
        return result.data
    }catch(error){
        logger.error('error from user-service.')
        logger.error(error);
        let defaultUser = new User()
        defaultUser.userId = userId
        return defaultUser
    }
}