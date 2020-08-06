import { service } from "./index";

export const getAllSerbianMessages = async () =>{
  try {
    let result = await service.get(`/serbian`, {
      headers:{
          'jwt_token': localStorage.token
      }
    })
    return result.data;
  } catch (error) {
    console.log(`error from allSerbianMessages remote`)
    console.log(error)
  }
}