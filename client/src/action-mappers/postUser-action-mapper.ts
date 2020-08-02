import { postUser } from '../remote/liveyourtruth-postUser';
import { User } from '../models/Users';

export const postUserTypes = {
    SUCCESSFUL_POST: 'P2_SUCCESSFUL_POST_USER',
    INTERNAL_SERVER: 'P2_POST_USER_INTERNAL_SERVER',
    BAD_REQUEST: 'P2_EDIT_USER_BAD_REQUEST',
    BAD_CREDENTIALS: 'P2_POST_USER_BAD_CREDENTIALS',
}
export const editUserActionMapper = (newUser:User) => async (dispatch:any) => {
    try {
        let user = await postUser(newUser)
        dispatch({
            type:postUserTypes.SUCCESSFUL_POST,
            payload:{
                user
            }
        })
    } catch (e) {
        if(e.message.includes('400')){
            dispatch({
                type:postUserTypes.BAD_REQUEST
            })
        } else if (e.message.includes('401')){
            dispatch({
                type:postUserTypes.BAD_CREDENTIALS
            })
        }else {
            dispatch({
                type:postUserTypes.INTERNAL_SERVER
            })
        }
    }
}