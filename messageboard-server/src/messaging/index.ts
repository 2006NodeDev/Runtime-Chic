
import { Message } from "../models/message";

const {PubSub} = require('@google-cloud/pubsub');
// // $ npm install @google-cloud/pubsub
const pubSubClient = new PubSub();
const topicName = ('projects/message-board-284300/topics/message-board-topic');
export const messageTopic = pubSubClient.topic(topicName);

export async function publishMessage(message:Message){
    try {
        let messageId = await messageTopic.publishJSON(message)
        console.log(`Message ${messageId} published.`);
        console.log(`message poster's email: ${message.email}`);        
    } catch (error) {
        console.log(`publish message error ${error}`);
    }
}