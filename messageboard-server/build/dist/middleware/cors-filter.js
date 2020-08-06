"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsFilter = void 0;
function corsFilter(req, res, next) {
    // bad hack in Access-Control-Allow-Origin, don't use.
    res.header('Access-Control-Allow-Origin', "" + req.headers.origin);
    // res.header('Access-Control-Allow-Origin', `http://project1.lnpappas.com`);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, jwt_token');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200); // sends back options pre-flight request
    }
    else {
        next(); // allows real requests to go to endpoint
    }
}
exports.corsFilter = corsFilter;
//# sourceMappingURL=cors-filter.js.map