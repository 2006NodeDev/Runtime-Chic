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
function listenForMessages() {
  // References an existing subscription
  const subscription = pubSubClient.subscription(subscriptionName);

  // Create an event handler to handle messages
  // let messageCount = 0;

  const messageHandler = (message) => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);
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
    console.log(`${messageCount} message(s) received.`);
    console.log(messages);
    console.log(userNotification);
  }, timeout * 100);
}

listenForMessages();

module.exports = listenForMessages;
