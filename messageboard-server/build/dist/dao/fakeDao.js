"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSerbianMessage = exports.getSerbianMessages = exports.postMessage = exports.getMessages = void 0;
var message_1 = require("../models/message");
function getMessages() {
    return messageArray;
}
exports.getMessages = getMessages;
function postMessage(newMessage) {
    console.log("posting message: " + newMessage.title);
    messageArray.push(newMessage);
    return newMessage;
}
exports.postMessage = postMessage;
var messageArray = [];
var m1 = new message_1.Message();
m1.messageId = 1;
m1.userId = 1;
m1.title = 'first message';
m1.message = 'this is the first message';
m1.date = '2020-07-01 23:23:04';
var m2 = new message_1.Message();
m2.messageId = 2;
m2.userId = 1;
m2.title = 'second message';
m2.message = 'this is the second message';
m2.date = '2020-07-02 02:02:45';
messageArray.push(m1);
messageArray.push(m2);
function getSerbianMessages() {
    return serbianArray;
}
exports.getSerbianMessages = getSerbianMessages;
function postSerbianMessage(newMessage) {
    console.log("posting message: " + newMessage.title);
    serbianArray.push(newMessage);
    return newMessage;
}
exports.postSerbianMessage = postSerbianMessage;
var serbianArray = [];
var ms1 = new message_1.Message();
ms1.messageId = 1;
ms1.userId = 1;
ms1.title = 'first message';
ms1.message = 'Ovo je nova poruka!';
ms1.date = '2020-07-01 23:23:04';
var ms2 = new message_1.Message();
ms2.messageId = 2;
ms2.userId = 1;
ms2.title = 'second message';
ms2.message = 'Jesam li uspio?';
ms2.date = '2020-07-02 02:02:45';
serbianArray.push(ms1);
serbianArray.push(ms2);
//# sourceMappingURL=fakeDao.js.map