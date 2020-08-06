"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLogger = exports.logger = void 0;
var log4js_1 = require("log4js");
log4js_1.configure({
    appenders: {
        console: { type: 'stdout', layout: { type: 'coloured' } },
        errorFile: { type: 'file', filename: 'logs/error.log' }
    },
    categories: {
        default: { appenders: ['console'], level: 'All' },
        error: { appenders: ['errorFile'], level: 'WARN' }
    }
});
exports.logger = log4js_1.getLogger();
exports.errorLogger = log4js_1.getLogger('error');
//logger.info()
//logger.debug()
//logger.error()
//logger.fatal()
//# sourceMappingURL=loggers.js.map