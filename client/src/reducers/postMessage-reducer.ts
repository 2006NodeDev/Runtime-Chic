import { IPostMessageState } from "."
import { AnyAction } from "redux"
import { postMessageTypes } from "../action-mappers/postMessage-action-mapper"

const initalState:IPostMessageState = {
    message: undefined,
    errorMessage: ''
}

export const postMessageReducer = (state= initalState, action:AnyAction) => {
    switch (action.type) {
        case postMessageTypes.BAD_CREDENTIALS:{
            return {
                ...state,
                errorMessage:'Incorrect username or Password'
            }
        }
        case postMessageTypes.BAD_REQUEST : {
            return {
                ...state,
                errorMessage:'Please Fill Out All Fields'
            }
        }
        case postMessageTypes.INTERNAL_SERVER: {
            return {
                ...state,
                errorMessage:'Oops, Something Went Wrong'
            }
        }
        case postMessageTypes.SUCCESSFUL_POST:{
            return {
                ...state,
                Message:action.payload.Message
            }
        }
        default:{
            return state
        }
    }
}