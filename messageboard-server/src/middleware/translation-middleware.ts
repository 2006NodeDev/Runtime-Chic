import { Message } from "../models/message";
import { postSerbianMessage } from "../dao/fakeDao";
import { logger } from "../util/loggers";

// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate();

// set langauge to translate to
const target = 'hr';//{ code: 'hr', name: 'Croatian' }

export async function getTextToTranslate(message:Message){

    let newMessage = new Message()
    newMessage.userId = message.userId;
    newMessage.messageId = message.messageId;
    newMessage.email = message.email;
    newMessage.date = message.date;

    await translateText(message.title, 'title')
    await translateText(message.message, 'message')
    logger.debug('title in top:', newMessage.title);
    logger.debug('message in top:', newMessage.message);
    postSerbianMessage(newMessage);
    
  async function translateText(text:string, type:string) {
    try {
      let [translations] = await translate.translate(text, target);
      translations = Array.isArray(translations) ? translations : [translations];
      let trans = ''
      translations.forEach((translation:any) => {
        logger.debug(`${text} => ${translation}`);
        trans = trans + translation.toString()
      });
      (type === 'title')?
      newMessage.title = trans
      :
      newMessage.message = trans;
      
    } catch (error) {
      logger.error(error);
    }
  }
}