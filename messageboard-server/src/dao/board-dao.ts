import { PoolClient, QueryResult } from "pg";
import { connectionPool } from ".";
import { MessageDTOtoMessageConverter } from "../util/MessageDTO-to-Message-converter";
import { Message } from "../models/message";
import { logger } from "../util/loggers";

//const schema = process.env['LB_SCHEMA'] || 'harrypotter'
const schema = 'messageboard' || 'harrypotter'

export async function getMessages():Promise<Message[]>{
    let client:PoolClient;
    try {
        client = await connectionPool.connect();
        let results:QueryResult = await client.query(`select m.message_id, m.user_id, m.title, m.message, m."date"
                                                        from ${schema}.messages m
                                                        order by m.message_id;`)
        logger.debug(`getMessages number of messages ${results.rows.length}`)
        if(results.rowCount === 0){
            throw new Error("No Messages")
        }
        return results.rows.map(MessageDTOtoMessageConverter);
    } catch (error) {
        if(error.message === "No Messages"){
            logger.error(error);
            throw new Error(error.message)
        } else {
            logger.error('unknown error getMessages')
            throw new Error('Unknown getMessages Error')
        }
    } finally {
        client?.release();
    }
}

export async function getOneMessage(messageId:any):Promise<Message>{
    let client:PoolClient;
    logger.debug(`messageId from getOneMessage: ${messageId}`);
    try {
        client = await connectionPool.connect();
        let result:QueryResult = await client.query(`select m.message_id, m.user_id, m.title, m.message, m."date"
                                                        from ${schema}.messages m
                                                        where m.message_id = $1
                                                        order by m.message_id`, [messageId])
        if(result.rowCount === 0){
            throw new Error("No Messages")
        }
        logger.debug(`result message from getOneMessage ${result.rows[0].messageId}`)
        let newMessage = result.rows[0]
        return MessageDTOtoMessageConverter(newMessage);
    } catch (error) {
        if(error.message === "No Messages"){
            logger.error(error);
            throw new Error(error.message)
        } else {
            logger.error('unknown error getOneMessage')
            throw new Error('Unknown getOneMessage Error')
        }
    } finally {
        client?.release();
    }
}


export async function postMessage(newMessage:Message):Promise<Message>{
    let client:PoolClient;
    try {
        client = await connectionPool.connect();
        logger.debug(`posting message title: ${newMessage.title}`);      
        let result = await client.query(`insert into ${schema}.messages("user_id", "title", "message")
                            values ($1, $2, $3)
                            returning message_id`,
                            [newMessage.userId, newMessage.title, newMessage.message])
        let messageId = result.rows[0].message_id;
        logger.debug(`posting message result: ${messageId}`);
        return getOneMessage(messageId);
    } catch (error) {
        logger.error('Unknown Error postMessage')
        throw new Error('Unknown postMessages Error')
    } finally {
        client?.release();
    }
}


export async function getSerbianMessages():Promise<Message[]>{
    let client:PoolClient;
    try {
        client = await connectionPool.connect();
        let results:QueryResult = await client.query(`select m.message_id, m.user_id, m.title, m.message, m."date"
                                                        from ${schema}.foreign_messages m
                                                        order by m.message_id;`)
        if(results.rowCount === 0){
            throw new Error("No Messages")
        }
        return results.rows.map(MessageDTOtoMessageConverter);
    } catch (error) {
        if(error.message === "No Messages"){
            logger.error(error);
            throw new Error(error.message)
        } else {
            logger.error('unknown error getSerbianMessages')
            throw new Error('Unknown getSerbianMessages Error')
        }
    } finally {
        client?.release();
    }
}

export async function postSerbianMessage(newMessage:Message):Promise<Message>{
    let client:PoolClient;
    logger.debug(`posting serbian message: ${newMessage}`);
    try {
        client = await connectionPool.connect();
        logger.debug(`posting serbian messageId: ${newMessage.messageId}`); 
   
        let result = await client.query(`insert into messageboard.foreign_messages("user_id", "title", "message")
                                            values ($1, $2, $3)
                                            returning message_id;`,
                                            [newMessage.userId, newMessage.title, newMessage.message])
        logger.debug(`returned serbian result: ${result.rows[0].message_id}`);
        return newMessage
    } catch (error) {
        logger.error('Unknown Error postSerbianMessage');
        throw new Error('Unknown postSerbianMessages Error');
    } finally {
        client?.release();
    }
}