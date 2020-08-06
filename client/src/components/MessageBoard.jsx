
import React, { useState } from 'react';
import React from "react";
import { Message } from "../models/Messages";
import { User } from "../models/Users";
import { MessageDisplay } from "../components/MessageDisplay";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from 'react-redux';
import { allMessagesActionMapper } from '../action-mappers/getMessages-action-mapper';
import Nav from './Nav';


const style = makeStyles((theme) => ({
  header: {
    alignSelf: "center",
    alignItems: "center",
  },
  body: {
    alignSelf: "center",
    alignItems: "center",
    width: 600,
  },
  button: {
    backgroundColor: "midnightblue",
    color: "white",
    alignSelf: "center",
    alignItems: "center",
    width: 100,
  },
  alignItemsAndJustifyContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

const MessageBoard = (props) =>{

    let[allUsers, setAllUsers] = useState('');

    const classes = style();
    let dispatch = useDispatch();


    const getMessages = async () => {
        try{
            console.log('getting messages...')
            let thunk = allMessagesActionMapper()
            dispatch(thunk)
        } catch (error){
            console.log(error)
        }
    }

    let url = process.env['USER_SERVICE_HOST'] || "http://localhost:3003";

    const getAllUsers = async () =>{
        try {
            fetch(`${url}/api/users/get/allUsers`)
            .then(response => response.json())
            .then((data) => {
                setAllUsers(data);
            })
        } catch (error) {
            console.log('No Users in MessageBoard')
        }
    }

    const allMessages = useSelector((state)=>{
        return state.allMessageState.messageList
    })

    const getUser = (messageId, allUsers) => {
        let result = allUsers.find(user => user.userId === messageId);
        return result
    }
    let messageDisplays = 'Loading Messages...';
    if (allMessages && allUsers){
        messageDisplays = allMessages.map((message)=>{
            return <MessageDisplay key={'message-key-' + message.messageId} message={message} user={getUser(message.userId, allUsers)}/>
        })
    } else if(allUsers){
        getMessages()
    }else{
        getAllUsers()
    }

    return(
        <div className={classes.alignItemsAndJustifyContent}>
            <Nav /><br/>
            <br/><h1 className={classes.header}> Message Board </h1> <br/>
            <div className={classes.body}>{messageDisplays}</div><br/>
        </div>
    )

}
export default MessageBoard;
