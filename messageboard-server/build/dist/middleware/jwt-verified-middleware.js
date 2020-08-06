"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTVerifyMiddleware = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var loggers_1 = require("../util/loggers");
exports.JWTVerifyMiddleware = function (req, res, Next) {
    var _a;
    try {
        var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ').pop(); //turn the string Bearer token -> token
        if (token) {
            req.user = jsonwebtoken_1.default.verify(token, process.env.jwtSecret);
            loggers_1.logger.debug("token: " + token);
        }
        Next();
    }
    catch (e) {
        loggers_1.logger.error('jwt middleware: Something is wrong with the token in the header.');
        Next(e);
    }
};
//# sourceMappingURL=jwt-verified-middleware.js.map