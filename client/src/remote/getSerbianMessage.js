import { liveyourtruthClient } from ".";

export const getAllSerbianMessages = async () =>{
    try{
        let response = await liveyourtruthClient.get('/serbian')
        return response.data
    }catch(e){
        console.log(e);
        throw e
    }
}