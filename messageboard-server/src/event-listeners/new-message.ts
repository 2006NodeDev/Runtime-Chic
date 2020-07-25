import { expressEventEmitter, customExpressEvents } from ".";
import { messageTopic } from "../messaging";
import { Message } from "../models/message";

expressEventEmitter.on(customExpressEvents.NEW_MESSAGE, (message:Message) => {
    console.log(`reached new-message`);
    
    setImmediate(async ()=>{
        try {
            let res = await messageTopic.publishJSON(message)
            console.log(res);
            console.log(`message poster's email: ${message.email}`);
            
        } catch (error) {
            console.log(error);
        }
    })
})