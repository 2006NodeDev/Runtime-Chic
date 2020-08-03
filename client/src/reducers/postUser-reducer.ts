import { IPostUsersState } from "."
import { AnyAction } from "redux"
import { postUserTypes } from "../action-mappers/postUser-action-mapper"

const initalState:IPostUsersState = {
    user: undefined,
    errorMessage: ''
}

export const postUserReducer = (state= initalState, action:AnyAction) => {
    switch (action.type) {
        case postUserTypes.BAD_CREDENTIALS:{
            return {
                ...state,
                errorMessage:'Incorrect Username or Password'
            }
        }
        case postUserTypes.BAD_REQUEST : {
            return {
                ...state,
                errorMessage:'Please Fill Out All Fields'
            }
        }
        case postUserTypes.INTERNAL_SERVER: {
            return {
                ...state,
                errorMessage:'Oops, Something Went Wrong'
            }
        }
        case postUserTypes.SUCCESSFUL_POST:{
            return {
                ...state,
                User:action.payload.user
            }
        }
        default:{
            return state
        }
    }
}