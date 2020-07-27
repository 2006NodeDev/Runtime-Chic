import { Message } from "../models/message";
import { postUkrainianMessage } from "../dao/SQL/fakeDao";

// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate();

// Set target language
const target = 'hr'; // { code: 'hr', name: 'Croatian' }

export async function getTextToTranslate(message:Message){
    await translateText(message.title, 'title')
    await translateText(message.message, 'message')
    console.log('title in top:', message.title);
    console.log('message in top:', message.message);
    postUkrainianMessage(message);
    
  async function translateText(text:string, type:string) {
    try {
      let [translations] = await translate.translate(text, target);
      translations = Array.isArray(translations) ? translations : [translations];
      let trans = ''
      translations.forEach((translation:any) => {
        console.log(`${text} => ${translation}`);
        trans = trans + translation.toString()
      });
      (type === 'title')?
      message.title = trans
      :
      message.message = trans;
      
    } catch (error) {
      console.log(error);
    }
  }
}