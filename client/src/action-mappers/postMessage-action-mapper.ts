import { postMessage } from '../remote/postMessages';
import { Message } from '../models/Messages';

export const postMessageTypes = {
    SUCCESSFUL_POST: 'P2_SUCCESSFUL_POST_MESSAGE',
    INTERNAL_SERVER: 'P2_POST_MESSAGE_INTERNAL_SERVER',
    BAD_REQUEST: 'P2_EDIT_MESSAGE_BAD_REQUEST',
    BAD_CREDENTIALS: 'P2_POST_MESSAGE_BAD_CREDENTIALS',
}
export const postMessageActionMapper = (newMessage:Message) => async (dispatch:any) => {
    try {
        let message = await postMessage(newMessage)
        dispatch({
            type:postMessageTypes.SUCCESSFUL_POST,
            payload:{
                message
            }
        })
    } catch (e) {
        if(e.message.includes('400')){
            dispatch({
                type:postMessageTypes.BAD_REQUEST
            })
        } else if (e.message.includes('401')){
            dispatch({
                type:postMessageTypes.BAD_CREDENTIALS
            })
        }else {
            dispatch({
                type:postMessageTypes.INTERNAL_SERVER
            })
        }
    }
}