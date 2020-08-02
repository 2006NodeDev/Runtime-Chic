import { liveyourtruthClient } from "."

export const postMessage = async (message) =>{
    try {
        let response = await liveyourtruthClient.post('/board', message)
        console.log(response);
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
}