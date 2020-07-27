// import { Message } from "../models/message";

// export async function getMessages():Promise<Message[]>{
//     try {
//         // if(results.rowCount === 0){
//         //     throw new Error("No Messages")
//         // }
//     } catch (error) {
//         if(error.message === "No Messages"){
//             console.log(error);
//             throw new Error(error.message)
//         } else {
//             throw new Error('Unknown get Error')
//         }
//     }
// }


// export async function postMessage(newMessage:Message):Promise<Message>{
//     try {
//         console.log(`posting message: ${newMessage.title}`);      
  
//     } catch (error) {
//         throw new Error('Unknown post Error')
//     }
// }


// export async function getSerbianMessages():Promise<Message[]>{
//     try {
//         // if(results.rowCount === 0){
//         //     throw new Error("No Messages")
//         // }
//     } catch (error) {
//         if(error.message === "No Messages"){
//             console.log(error);
//             throw new Error(error.message)
//         } else {
//             throw new Error('Unknown get Error')
//         }
//     }
// }

// export async function postSerbianMessage(newMessage:Message):Promise<Message>{
//     try {
//         console.log(`posting message: ${newMessage.title}`);
        
//     } catch (error) {
//         throw new Error('Unknown post Error')
//     }
// }