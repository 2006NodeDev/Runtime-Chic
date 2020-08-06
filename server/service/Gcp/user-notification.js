//  const projectId = 'message-board-284300';

const subscriptionName =
  "projects/message-board-284300/subscriptions/gcf-user-pubsub-us-east4-message-board-topic";

const timeout = 60;

// Imports the Google Cloud client library
const { PubSub } = require("@google-cloud/pubsub");

// Creates a client; cache this for further use
const pubSubClient = new PubSub({
  projectId: "message-board-284300",
  keyFileName: "./message-board-keys.json",
});
let messageCount = 0;
let messages = [];

const notification = [];
const listenForMessages = () => {
  // References an existing subscription
  const subscription = pubSubClient.subscription(subscriptionName);

  // Create an event handler to handle messages
  // let messageCount = 0;

  const messageHandler = (message) => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    messageCount += 1;

    messages.push(JSON.parse(Buffer.from(message.data, "base64").toString()));

    // "Ack" (acknowledge receipt of) the message
    // message.ack();
  };

  // Listen for new messages until timeout is hit
  subscription.on("message", messageHandler);
  // console.log(`${messageCount} message(s) received.`);
  // console.log(messages);

  setTimeout(() => {
    subscription.removeListener("message", messageHandler);
    let userNotification = {
      messageCount,
      messages,
    };

    let getMessage = messages.map((message) => {
      return {
        title: message.title || null,
        messageUser: message.userId || null,
        message: message.message || null,
      };
    });

    notification.push(getMessage);

    console.log(`${messageCount} message(s) received.`);
    // console.log(messages);
    // console.log(userNotification);
    console.log(getMessage);
    // console.log(notification.getMessage);
  }, timeout * 100);
};

listenForMessages();

module.exports = {
  setTimeout,
  notification,
};
