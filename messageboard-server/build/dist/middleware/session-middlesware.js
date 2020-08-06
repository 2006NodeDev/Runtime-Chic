"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleware = void 0;
var express_session_1 = __importDefault(require("express-session"));
// use date and random # to create a sha1 hash
var currentDate = (new Date()).valueOf().toString(); // gets current date, converts to string
var random = Math.random().toString(); // gets random number, converts to string
var crypto = require('crypto'); // includes crypto module in application
var hash = crypto.createHash('sha1').update(currentDate + random).digest('hex'); // makes sha1 hash in hex with date & random #
// Password Hashing: Hased sessionConfig:secret
var sessionConfig = {
    secret: hash,
    cookie: {
        secure: false
    },
    resave: false,
    saveUninitialized: false
};
exports.sessionMiddleware = express_session_1.default(sessionConfig);
//# sourceMappingURL=session-middlesware.js.map