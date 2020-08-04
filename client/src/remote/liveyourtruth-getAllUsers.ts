import { liveyourtruthClient } from ".";

export const getAllUsers = async () =>{
    try{
        let response = await liveyourtruthClient.get('/api/users/get/allUsers', {
        headers:{
            'jwt_token': localStorage.token
        }
        });
        console.log(`sucess from allUser remote! ${response}`)
        return response.data
    }catch(e){
        console.log(`error from getAllUsers remote ${e}`);
        throw e
    }
}