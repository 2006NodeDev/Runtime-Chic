import { getAllSerbianMessages } from "../remote/getSerbianMessage"

export const serbianMessageTypes = {
    SUCCUSSFUL_REQUEST: 'P2_SUCCUSSFUL_All_SERBIAN_MESSAGES',
    AUTHORIZATION_ERROR: 'P2_UNAUTHORIZED',
    EMPTY_LIST: 'P2_NO_SERBIAN_MESSAGES',
    INTERNAL_SERVER: 'P2_INTERNAL_SERVER'
}

export const allSerbianMessagesActionMapper = () => async (dispatch:any) =>{
    try{
        let allMessages = await getAllSerbianMessages()
        if( allMessages.length === 0){
            throw new Error('No Messages')
        }
        dispatch({
            type:serbianMessageTypes.SUCCUSSFUL_REQUEST,
            payload:{
                allMessages
            }
        })   
    }catch(e){
        if(e.message.includes('401')){
            dispatch({
                type:serbianMessageTypes.AUTHORIZATION_ERROR
            })
        } else if(e.message.includes('No Messages')){
            dispatch({
                type:serbianMessageTypes.EMPTY_LIST
            })
        }else{
            dispatch({
                type:serbianMessageTypes.INTERNAL_SERVER
            })
        }
    }
}