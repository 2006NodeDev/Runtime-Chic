"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSerbianMessage = exports.getSerbianMessages = exports.postMessage = exports.getOneMessage = exports.getMessages = void 0;
var _1 = require(".");
var MessageDTO_to_Message_converter_1 = require("../util/MessageDTO-to-Message-converter");
var loggers_1 = require("../util/loggers");
//const schema = process.env['LB_SCHEMA'] || 'harrypotter'
var schema = 'messageboard' || 'harrypotter';
function getMessages() {
    return __awaiter(this, void 0, void 0, function () {
        var client, results, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("select m.message_id, m.user_id, m.title, m.message, m.\"date\"\n                                                        from " + schema + ".messages m\n                                                        order by m.message_id;")];
                case 2:
                    results = _a.sent();
                    loggers_1.logger.debug("getMessages number of messages " + results.rows.length);
                    if (results.rowCount === 0) {
                        throw new Error("No Messages");
                    }
                    return [2 /*return*/, results.rows.map(MessageDTO_to_Message_converter_1.MessageDTOtoMessageConverter)];
                case 3:
                    error_1 = _a.sent();
                    if (error_1.message === "No Messages") {
                        loggers_1.logger.error(error_1);
                        throw new Error(error_1.message);
                    }
                    else {
                        loggers_1.logger.error('unknown error getMessages');
                        throw new Error('Unknown getMessages Error');
                    }
                    return [3 /*break*/, 5];
                case 4:
                    client === null || client === void 0 ? void 0 : client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getMessages = getMessages;
function getOneMessage(messageId) {
    return __awaiter(this, void 0, void 0, function () {
        var client, result, newMessage, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loggers_1.logger.debug("messageId from getOneMessage: " + messageId);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 2:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("select m.message_id, m.user_id, m.title, m.message, m.\"date\"\n                                                        from " + schema + ".messages m\n                                                        where m.message_id = $1\n                                                        order by m.message_id", [messageId])];
                case 3:
                    result = _a.sent();
                    if (result.rowCount === 0) {
                        throw new Error("No Messages");
                    }
                    loggers_1.logger.debug("result message from getOneMessage " + result.rows[0].messageId);
                    newMessage = result.rows[0];
                    return [2 /*return*/, MessageDTO_to_Message_converter_1.MessageDTOtoMessageConverter(newMessage)];
                case 4:
                    error_2 = _a.sent();
                    if (error_2.message === "No Messages") {
                        loggers_1.logger.error(error_2);
                        throw new Error(error_2.message);
                    }
                    else {
                        loggers_1.logger.error('unknown error getOneMessage');
                        throw new Error('Unknown getOneMessage Error');
                    }
                    return [3 /*break*/, 6];
                case 5:
                    client === null || client === void 0 ? void 0 : client.release();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getOneMessage = getOneMessage;
function postMessage(newMessage) {
    return __awaiter(this, void 0, void 0, function () {
        var client, result, messageId, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    loggers_1.logger.debug("posting message title: " + newMessage.title);
                    return [4 /*yield*/, client.query("insert into " + schema + ".messages(\"user_id\", \"title\", \"message\")\n                            values ($1, $2, $3)\n                            returning message_id", [newMessage.userId, newMessage.title, newMessage.message])];
                case 2:
                    result = _a.sent();
                    messageId = result.rows[0].message_id;
                    loggers_1.logger.debug("posting message result: " + messageId);
                    return [2 /*return*/, getOneMessage(messageId)];
                case 3:
                    error_3 = _a.sent();
                    loggers_1.logger.error('Unknown Error postMessage');
                    throw new Error('Unknown postMessages Error');
                case 4:
                    client === null || client === void 0 ? void 0 : client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.postMessage = postMessage;
function getSerbianMessages() {
    return __awaiter(this, void 0, void 0, function () {
        var client, results, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 1:
                    client = _a.sent();
                    return [4 /*yield*/, client.query("select m.message_id, m.user_id, m.title, m.message, m.\"date\"\n                                                        from " + schema + ".foreign_messages m\n                                                        order by m.message_id;")];
                case 2:
                    results = _a.sent();
                    if (results.rowCount === 0) {
                        throw new Error("No Messages");
                    }
                    return [2 /*return*/, results.rows.map(MessageDTO_to_Message_converter_1.MessageDTOtoMessageConverter)];
                case 3:
                    error_4 = _a.sent();
                    if (error_4.message === "No Messages") {
                        loggers_1.logger.error(error_4);
                        throw new Error(error_4.message);
                    }
                    else {
                        loggers_1.logger.error('unknown error getSerbianMessages');
                        throw new Error('Unknown getSerbianMessages Error');
                    }
                    return [3 /*break*/, 5];
                case 4:
                    client === null || client === void 0 ? void 0 : client.release();
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getSerbianMessages = getSerbianMessages;
function postSerbianMessage(newMessage) {
    return __awaiter(this, void 0, void 0, function () {
        var client, result, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    loggers_1.logger.debug("posting serbian message: " + newMessage);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, _1.connectionPool.connect()];
                case 2:
                    client = _a.sent();
                    loggers_1.logger.debug("posting serbian messageId: " + newMessage.messageId);
                    return [4 /*yield*/, client.query("insert into messageboard.foreign_messages(\"user_id\", \"title\", \"message\")\n                                            values ($1, $2, $3)\n                                            returning message_id;", [newMessage.userId, newMessage.title, newMessage.message])];
                case 3:
                    result = _a.sent();
                    loggers_1.logger.debug("returned serbian result: " + result.rows[0].message_id);
                    return [2 /*return*/, newMessage];
                case 4:
                    error_5 = _a.sent();
                    loggers_1.logger.error('Unknown Error postSerbianMessage');
                    throw new Error('Unknown postSerbianMessages Error');
                case 5:
                    client === null || client === void 0 ? void 0 : client.release();
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.postSerbianMessage = postSerbianMessage;
//# sourceMappingURL=board-dao.js.map