import { Message } from "../../models/message";

export function getMessages(){
    return messageArray
}

export function postMessage(newMessage:Message){
    console.log(`posting message: ${newMessage.title}`);
        messageArray.push(newMessage);
        return newMessage
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
messageArray.push(m2);

export function getUkrainianMessages(){
    return ukrainianArray
}

export function postUkrainianMessage(newMessage:Message){
    console.log(`posting message: ${newMessage.title}`);
        ukrainianArray.push(newMessage);
        return newMessage
}

let ukrainianArray = [];

let ms1 = new Message();
ms1.messageId = 1
ms1.userId = 1
ms1.title = 'first message'
ms1.message = 'Ovo je nova poruka!'
ms1.date = '2020-07-01 23:23:04'

let ms2 = new Message();
ms2.messageId = 2
ms2.userId = 1
ms2.title = 'second message'
ms2.message = 'Jesam li uspio?'
ms2.date = '2020-07-02 02:02:45'

ukrainianArray.push(ms1);
ukrainianArray.push(ms2);