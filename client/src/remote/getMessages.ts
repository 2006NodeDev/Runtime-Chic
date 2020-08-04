import { service } from "./index";

export const getAllMessages = async () =>{
  try {
    let result = await service.get(`/board`, {
      headers:{
          'jwt_token': localStorage.token
      }
    })
    return result.data;
  } catch (error) {
    console.log(`error from allMessages remote`)
    console.log(error)
  }
}