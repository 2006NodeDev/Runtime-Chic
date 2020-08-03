import { liveyourtruthEditUser } from '../remote/liveyortruth-editProfile';
import { User } from '../models/Users';

export const editUserTypes = {
    SUCCESSFUL_EDIT: 'P2_SUCCESSFUL_EDIT_USER',
    INTERNAL_SERVER: 'P2_EDIT_USER_INTERNAL_SERVER',
    BAD_REQUEST: 'P2_EDIT_USER_BAD_REQUEST',
    BAD_CREDENTIALS: 'P2_EDIT_USER_BAD_CREDENTIALS',
}
export const editUserActionMapper = (changedUser:User) => async (dispatch:any) => {
    try {
        let user = await liveyourtruthEditUser(changedUser)
        dispatch({
            type:editUserTypes.SUCCESSFUL_EDIT,
            payload:{
                user
            }
        })
    } catch (e) {
        if(e.message.includes('400')){
            dispatch({
                type:editUserTypes.BAD_REQUEST
            })
        } else if (e.message.includes('401')){
            dispatch({
                type:editUserTypes.BAD_CREDENTIALS
            })
        }else {
            dispatch({
                type:editUserTypes.INTERNAL_SERVER
            })
        }
    }
}