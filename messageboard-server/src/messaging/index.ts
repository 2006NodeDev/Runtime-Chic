
import { Message } from "../models/message";
import { logger } from "../util/loggers";

const {PubSub} = require('@google-cloud/pubsub');
// $ npm install @google-cloud/pubsub
const pubSubClient = new PubSub();

const topicName = ('projects/message-board-284300/topics/message-board-topic');
export const messageTopic = pubSubClient.topic(topicName);
export async function publishMessage(message:Message){
    try {
        let messageId = await messageTopic.publishJSON(message)
        logger.debug(`Pub/Sub message ${messageId} published.`);        
    } catch (error) {
        logger.error(`Pub/Sub message error ${error}`)
    }
}

// If we need to get a pub/sub from the user-server
// export const userService = pubSubClient.subscription('messageboard-service to user-service');
// export async function connectToUser(){
//     try {
//         let data = JSON.parse(Buffer.from(userService.data, 'base64').toString());
//         logger.debug(`User eamil from Pub/Sub ${data}`);
//     } catch (error) {
//         logger.error(error);
//     }
// }