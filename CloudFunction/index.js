let nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env['EMAIL'],
        pass: process.env['PASSWORD']
    }
})

const messageTemplate = {
    from: process.env['EMAIL'],
    to: '',
    subject: 'New Post!',
    text: 'You posted a message to the message board.'
}

/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.messageEmail = (event, context) => {
    let newMessage = JSON.parse(Buffer.from(event.data, 'base64').toString())
    console.log(newMessage);
    messageTemplate.to = newMessage.email
    transporter.sendMail(messageTemplate)
};