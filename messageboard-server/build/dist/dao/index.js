"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionPool = void 0;
var pg_1 = require("pg");
exports.connectionPool = new pg_1.Pool({
    host: "34.86.141.95",
    user: "postgres",
    password: "NodeDev2006",
    database: "message-board",
    port: 5432,
    max: 5,
});
//# sourceMappingURL=index.js.map