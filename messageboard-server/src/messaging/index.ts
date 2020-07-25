import { PubSub } from '@google-cloud/pubsub'
// $ npm install @google-cloud/pubsub
const pubSubClient = new PubSub();
  
export const messageTopic = pubSubClient.topic('projects/message-board-284300/topics/message-board-topic');