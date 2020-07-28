import { liveyourtruthClient } from ".";

export const getAllMessages = async () =>{
    try{
        let response = await liveyourtruthClient.get('/board')
        return response.data
    }catch(e){
        console.log(e);
        throw e
    }
}