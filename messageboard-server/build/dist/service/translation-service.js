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
exports.getTextToTranslate = void 0;
var message_1 = require("../models/message");
// import { postSerbianMessage } from "../dao/board-dao";
var loggers_1 = require("../util/loggers");
// Imports the Google Cloud client library
var Translate = require('@google-cloud/translate').v2.Translate;
// Creates a client
var translate = new Translate();
// set langauge to translate to
var target = 'uk'; //{ code: 'uk', name: 'Ukranian' }
function getTextToTranslate(message) {
    return __awaiter(this, void 0, void 0, function () {
        function translateText(text, type) {
            return __awaiter(this, void 0, void 0, function () {
                var translations, trans_1, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, translate.translate(text, target)];
                        case 1:
                            translations = (_a.sent())[0];
                            translations = Array.isArray(translations) ? translations : [translations];
                            trans_1 = '';
                            translations.forEach(function (translation) {
                                loggers_1.logger.debug(text + " => " + translation);
                                trans_1 = trans_1 + translation.toString();
                            });
                            (type === 'title') ?
                                newMessage.title = trans_1
                                :
                                    newMessage.message = trans_1;
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            loggers_1.logger.error(error_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        var newMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newMessage = new message_1.Message();
                    newMessage.userId = message.userId;
                    newMessage.messageId = message.messageId;
                    newMessage.email = message.email;
                    newMessage.date = message.date;
                    return [4 /*yield*/, translateText(message.title, 'title')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, translateText(message.message, 'message')];
                case 2:
                    _a.sent();
                    return [2 /*return*/, newMessage];
            }
        });
    });
}
exports.getTextToTranslate = getTextToTranslate;
//# sourceMappingURL=translation-service.js.map