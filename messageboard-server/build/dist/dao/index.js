"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionPool = void 0;
var pg_1 = require("pg");
exports.connectionPool = new pg_1.Pool({
    host: process.env['MB_HOST'],
    user: process.env['MB_USER'],
    password: process.env['MB_PASSWORD'],
    database: process.env['MB_DATABASE'],
    port: 5432,
    max: 5 // max # connections
});
//# sourceMappingURL=index.js.map