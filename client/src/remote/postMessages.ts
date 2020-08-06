import { service } from "./index"
import { Message } from "../models/Messages";

export const postMessage = async (message:Message) =>{
    console.log('postMessage remote');
    try {
        let response = await service.post('/board', message);
        console.log(response);
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
}