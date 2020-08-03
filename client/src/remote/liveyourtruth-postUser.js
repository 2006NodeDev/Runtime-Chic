import { liveyourtruthClient } from "."

export const postUser = async (user) =>{
    try {
        let response = await liveyourtruthClient.post('/api/users/register', user)
        console.log(response);
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
}