let messageCount = 0;

/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.helloPubSub = (event, context) => {
  messageCount++;
  const message = event.data
    ? Buffer.from(event.data, "base64").toString()
    : `this is the ${messageCount} time`;
  // console.log(message);
};
