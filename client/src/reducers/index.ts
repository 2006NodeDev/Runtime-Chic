import { combineReducers } from "redux";
import { User } from "../models/Users";
import { Message } from "../models/Messages";
import { allMessagesReducer } from "./getMessages-reducer";
import { allSerbianMessagesReducer } from "./getSerbianMessage-reducer";
import { postMessageReducer } from "./postMessage-reducer";

export interface ILoginState {
  currentUser?: User;
  errorMessage: string;
}

export interface IAllUsersState {
  userList?: User[];
  errorMessage: string;
}

export interface IeditUsersState {
  user?: User;
  errorMessage: string;
}

export interface IPostUsersState {
  user?: User;
  errorMessage: string;
}

export interface IAllMessagesState {
  messageList?: Message[];
  errorMessage: string;
}

export interface IAllSerbianMessagesState {
  messageList?: Message[];
  errorMessage: string;
}

export interface IPostMessageState {
  message?: Message;
  errorMessage: string;
}


export interface IState{
    allMessageState:IAllMessagesState,
    allSerbianMessageState:IAllSerbianMessagesState,
    postMessageState:IPostMessageState,
}

export const state = combineReducers<IState>({
    allMessageState:allMessagesReducer,
    allSerbianMessageState:allSerbianMessagesReducer,
    postMessageState:postMessageReducer,
})

