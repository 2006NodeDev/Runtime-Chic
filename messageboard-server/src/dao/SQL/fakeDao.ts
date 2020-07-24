import { Message } from "../../models/message";

export function getMessages(){
    return messageArray
}

export function postMessage(newMessage:Message){
    console.log(`posting message: ${newMessage.title}`);
        messageArray.push(newMessage);
        return messageArray
}

let messageArray = [];

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

messageArray.push(m1);
messageArray.push(m2)