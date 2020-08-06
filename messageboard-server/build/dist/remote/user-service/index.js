"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServiceBaseClient = void 0;
var axios_1 = __importDefault(require("axios"));
// env for host address or localhost default
var baseURL = process.env['USER_SERVICE_HOST'] || 'http://localhost:3003';
exports.userServiceBaseClient = axios_1.default.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});
//# sourceMappingURL=index.js.map