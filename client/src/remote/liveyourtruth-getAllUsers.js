import { liveyourtruthClient } from ".";

export const getAllUsers = async () =>{
    try{
        let response = await liveyourtruthClient.get('/api/users/get/allUsers')
        return response.data
    }catch(e){
        console.log(e);
        throw e
    }
}