import { liveyourtruthLogin  } from "../remote/liveyortruth-login"

export const loginTypes = {
    SUCCESSFUL_LOGIN: 'P2_SUCCESSFUL_LOGIN',
    INVALID_CREDENTIALS: 'P2_INVALID_CREDENTIALS',
    INTERNAL_SERVER: 'P2_LOGIN_INTERNAL_SERVER',
    BAD_REQUEST: 'P2_LOGIN_BAD_REQUEST',
    RESET_ERROR: 'P2_RESET_ERROR',
    USER_LOGOUT: 'USER_LOGOUT'
}

export const LoginActionMapper = (username:string, password:string) => async (dispatch:any) => {
    try{
        if (username === 'logout'){
            throw Error('logout') 
        }
        let currentUser = await liveyourtruthLogin (username,password)
        dispatch({
            type:loginTypes.SUCCESSFUL_LOGIN,
            payload:{
                currentUser
            }
        })
    } catch(e){        
        if(e.message.includes('400')){
            dispatch({
                type:loginTypes.BAD_REQUEST
            })
        } else if (e.message.includes('401')){
            dispatch({
                type:loginTypes.INVALID_CREDENTIALS
            })
        }else if (e.message === 'logout'){
            dispatch({
                type:loginTypes.USER_LOGOUT
            })
        } else {
            dispatch({
                type:loginTypes.INTERNAL_SERVER
            })
        }

    }
}


export const loginErrorReset = () =>{
    return{
        type:loginTypes.RESET_ERROR
    }
}