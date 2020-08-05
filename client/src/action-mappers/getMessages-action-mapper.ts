import { getAllMessages } from "../remote/getMessages"


export const messageTypes = {
    SUCCUSSFUL_REQUEST: 'P2_SUCCUSSFUL_All_MESSAGES',
    AUTHORIZATION_ERROR: 'P2_UNAUTHORIZED',
    EMPTY_LIST: 'P2_NO_MESSAGES',
    INTERNAL_SERVER: 'P2_INTERNAL_SERVER'
}

export const allMessagesActionMapper = () => async (dispatch:any) =>{
    try{
        let allMessages = await getAllMessages()
        // if( allMessages.length === 0){
        //     throw new Error('No Messages')
        // }
        dispatch({
            type:messageTypes.SUCCUSSFUL_REQUEST,
            payload:{
                allMessages
            }
        })   
    }catch(e){
        if(e.message.includes('401')){
            dispatch({
                type:messageTypes.AUTHORIZATION_ERROR
            })
        } else if(e.message.includes('No Messages')){
            dispatch({
                type:messageTypes.EMPTY_LIST
            })
        }else{
            dispatch({
                type:messageTypes.INTERNAL_SERVER
            })
        }
    }
}