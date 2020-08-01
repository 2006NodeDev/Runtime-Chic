import { User } from "../models/Users";

export interface ILoginState{
    currentUser:User,
    errorMessage: string
}

export interface IState{
    loginState: ILoginState
}




