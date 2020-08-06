"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var logging_middleware_1 = require("./middleware/logging-middleware");
var cors_filter_1 = require("./middleware/cors-filter");
var board_router_1 = require("./routers/board-router");
var jwt_verified_middleware_1 = require("./middleware/jwt-verified-middleware");
var serbian_router_1 = require("./routers/serbian-router");
var loggers_1 = require("./util/loggers");
var app = express_1.default();
app.use(express_1.default.json({ limit: '50mb' }));
app.use(logging_middleware_1.loggingMiddleWare);
app.use(cors_filter_1.corsFilter);
app.use(jwt_verified_middleware_1.JWTVerifyMiddleware);
app.use('/board', board_router_1.boardRouter);
app.use('/serbian', serbian_router_1.serbianRouter);
app.get('/health', function (req, res) {
    res.sendStatus(200);
});
app.listen(2007, function () {
    loggers_1.logger.info("MessageBoard server has started");
});
process.on('uncaughtException', function (err) {
    loggers_1.logger.fatal("Uncaught Exception: " + err.message + " " + err.stack);
    loggers_1.errorLogger.fatal("Uncaught Exception: " + err.message + " " + err.stack);
    process.exit(1);
});
//# sourceMappingURL=index.js.map