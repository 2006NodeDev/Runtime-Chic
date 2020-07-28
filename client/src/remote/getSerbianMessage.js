import { liveyourtruthClient } from "."
import { Message } from "../../models/Message";

export const editUser = async (message) =>{
    try {
        let response = await liveyourtruthClient.patch('/serbian', message)
        console.log(response);
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
}