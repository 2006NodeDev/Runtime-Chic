import { service } from "./index"
import { Message } from "../models/Messages";

export const postMessage = async (message:any) =>{
    console.log('postMessage remote');
    try {
        let response = await service.post('/board', {
            headers:{
                "jwt_token": localStorage.token
            },
            body: message
        });
        console.log(response);
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
}