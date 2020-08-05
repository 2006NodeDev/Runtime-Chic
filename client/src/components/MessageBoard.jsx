import React from 'react';
import { User } from '../models/Users';
import { MessageDisplay } from '../components/MessageDisplay';
import { makeStyles } from '@material-ui/core/styles'; 
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { allMessagesActionMapper } from '../action-mappers/getMessages-action-mapper';
import { allUsersActionMapper } from '../action-mappers/allUsers-action-mapper';

const style = makeStyles((theme) => ({
    header:{
        alignSelf:'center',
        alignItems:'center',
    },
    body:{
        alignSelf:'center',
        alignItems:'center',
        width: 600,
    },
    button:{
        backgroundColor:'midnightblue',
        color:'white',
        alignSelf:'center',
        alignItems:'center',
        width: 100,
    },
    alignItemsAndJustifyContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      },
}));

const MessageBoard = (props) =>{
    const classes = style();
    let dispatch = useDispatch();

    const getAllUsers = async () => {
        try{
            let thunk = allUsersActionMapper()
            dispatch(thunk)
        } catch (error){
            console.log(error)
        }
    }

    const getMessages = async () => {
        try{
            console.log('getting messages...')
            let thunk = allMessagesActionMapper()
            dispatch(thunk)
        } catch (error){
            console.log(error)
        }
    }

    const allMessages = useSelector((state)=>{
        return state.allMessageState.messageList
    })

    const allUsers = useSelector((state)=>{
    return state.allUserState.userList
    })

        // Testing code
        // let allUsers = [];
    
        // let u1 = new User();
        // u1.userId = 1;
        // u1.username = 'Harry';
        // u1.houseId = 1;
    
        // let u2 = new User();
        // u2.userId = 2;
        // u2.username = 'Draco';
        // u2.house = 2;

        // let u3 = new User();
        // u3.userId = 3;
        // u3.username = 'Luna';
        // u3.house = 3;

        // let u4 = new User();
        // u4.userId = 4;
        // u4.username = 'Cedric';
        // u4.house = 4;
    
        // allUsers.push(u1)
        // allUsers.push(u2)
        // allUsers.push(u3)
        // allUsers.push(u4)

    const getUser = (messageId, allUsers) => {
        let result = allUsers.find(user => user.userId === messageId);
        return result
    }
    let messageDisplays = 'Loading Messages...';
    if (allMessages && allUsers){
        messageDisplays = allMessages.map((message)=>{
            return <MessageDisplay key={'message-key-' + message.messageId} message={message} user={getUser(message.userId, allUsers)}/>
        })
    } else{
        getMessages()
        // getAllUsers()
    }

    return(
        <div className={classes.alignItemsAndJustifyContent}>
            <br/><h1 className={classes.header}> Message Board </h1> <br/>
            <Button className={classes.button} variant="contained" disableElevation>Translate</Button><br/>
            <div className={classes.body}>{messageDisplays}</div>
        </div>
    )

}
export default MessageBoard;