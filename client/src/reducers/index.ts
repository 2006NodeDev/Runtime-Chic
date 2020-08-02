import { combineReducers } from "redux";
import { User } from "../models/Users";
import { Message } from "../models/Messages";
import { loginReducer } from "./login-reducer";
import { allUserReducer } from "./allUsers-reducer";
import { editUserReducer } from "./editUsers-reducer";

export interface ILoginState{
    currentUser:User,
    errorMessage:string
}

export interface IAllUsersState{
    userList:User[],
    errorMessage:string
}

export interface IeditUsersState{
    user:User,
    errorMessage:string
}

export interface IAllMessagesState{
    messageList:Message[],
    errorMessage:string
}

export interface IAllSerbianMessagesState{
    messageList:Message[],
    errorMessage:string
}

export interface IPOSTMessageState{
    messageList:Message,
    errorMessage:string
}

export interface IState{
    loginState:ILoginState,
    allUserState:IAllUsersState,
    editUserState:IeditUsersState,
}

export const state = combineReducers<IState>({
    loginState:loginReducer,
    allUserState:allUserReducer,
    editUserState:editUserReducer,
})