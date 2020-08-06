"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingMiddleWare = void 0;
var loggers_1 = require("../util/loggers");
function loggingMiddleWare(req, res, next) {
    loggers_1.logger.debug(req.method + " Request from " + req.ip + " to " + req.path);
    next();
}
exports.loggingMiddleWare = loggingMiddleWare;
//# sourceMappingURL=logging-middleware.js.map