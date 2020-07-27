
import session, { SessionOptions } from "express-session";

// use date and random # to create a sha1 hash
let currentDate:string = (new Date()).valueOf().toString(); // gets current date, converts to string
let random = Math.random().toString(); // gets random number, converts to string
var crypto = require('crypto'); // includes crypto module in application
let hash = crypto.createHash('sha1').update(currentDate + random).digest('hex'); // makes sha1 hash in hex with date & random #

// Password Hashing: Hased sessionConfig:secret

const sessionConfig:SessionOptions = {
    secret: hash,
    cookie:{
        secure:false
    },
    resave:false,
    saveUninitialized:false
}

export const sessionMiddleware = session(sessionConfig);