import React from 'react';
import { Message } from '../models/Messages'
import { User } from '../models/Users'
import { MessageDisplay } from '.' 

const MessageBoard = (props) =>{

    // const allUsers = useSelector((state)=>{
    //     return state.allUserState.userList
    // })

    // const allMessages = useSelector((state)=>{
    //     return state.allMessageState.messageList
    // })

    const getUser = (messageId, user) => {
        console.log(`userId: ${user.userid}, messageId: ${messageId}`)
        if(messageId === user.userId){
            return user
        }
    }

    let messageDisplays = allMessages.map((message)=>{
        return <MessageDisplay key={'message-key-' + message.messageId} message={message} user={allUsers.reduce(getUser, message.userId)}/>
    })

    // Testing code
    let allMessages = [];

    let m1 = new Message();
    m1.messageId = 1
    m1.userId = 1
    m1.title = 'first message'
    m1.message = 'this is the first message'
    m1.date = '2020-07-01 23:23:04'
    
    let m2 = new Message();
    m2.messageId = 2
    m2.userId = 1
    m2.title = 'second message'
    m2.message = 'this is the second message'
    m2.date = '2020-07-02 02:02:45'

    let m3 = new Message();
    m2.messageId = 3
    m2.userId = 2
    m2.title = 'third message'
    m2.message = 'this is the third message'
    m2.date = '2020-07-29 12:02:45'

    allMessages.push(m1)
    allMessages.push(m2)
    allMessages.push(m3)

    let allUsers = [];

    let u1 = new User();
    u1.userid = 1;

    let u2 = new User();
    u2.userid = 2;

    allUsers.push(u1)
    allUsers.push(u2)

    return(
        <div >
            {messageDisplays}
        </div>
    )

}
export default MessageBoard;