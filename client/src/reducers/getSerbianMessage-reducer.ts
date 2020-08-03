import { IAllSerbianMessagesState} from '.'
import { AnyAction } from 'redux'
import { serbianMessageTypes } from '../action-mappers/getSerbianMessages-action-mapper';

const initialState:IAllSerbianMessagesState = {
    messageList: undefined,
    errorMessage:''
}

export const allSerbianMessagesReducer = (state=initialState, action:AnyAction)=>{
    switch (action.type){
        case serbianMessageTypes.AUTHORIZATION_ERROR:{
            return {
                ...state,
                errorMessage:'You are not authroized'
            }
        }
        case serbianMessageTypes.EMPTY_LIST:{
            return {
                ...state,
                errorMessage:'There are no serbian messagess'
            }
        }
        case serbianMessageTypes.INTERNAL_SERVER:{
            return {
                ...state,
                errorMessage:'Oops, Something Went Wrong'
            }
        }
        case serbianMessageTypes.SUCCUSSFUL_REQUEST:{
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