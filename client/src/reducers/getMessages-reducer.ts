import { IAllMessagesState} from '.'
import { AnyAction } from 'redux'
import { messageTypes } from '../action-mappers/getMessages-action-mapper';

const initialState:IAllMessagesState = {
    messageList: undefined,
    errorMessage:''
}

export const allMessagesReducer = (state=initialState, action:AnyAction)=>{
    switch (action.type){
        case messageTypes.AUTHORIZATION_ERROR:{
            return {
                ...state,
                errorMessage:'You are not authroized'
            }
        }
        case messageTypes.EMPTY_LIST:{
            return {
                ...state,
                errorMessage:'There are no messagess'
            }
        }
        case messageTypes.INTERNAL_SERVER:{
            return {
                ...state,
                errorMessage:'Oops, Something Went Wrong'
            }
        }
        case messageTypes.SUCCUSSFUL_REQUEST:{
            return {
                ...state,
                messageList:action.payload.allMessages
            }
        }
        default:{
            return state
        }
    }
}