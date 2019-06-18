const path = require("path");
const proxy = require('http-proxy-middleware');
const paths = require('../config/paths');

require('@babel/register');

module.exports = function (app) {

    const mockPaths = [
        path.join(paths.appPath, 'mock')
    ];

    app.use(require("@acme-top/express-mock-middleware").createMiddleware(mockPaths));
};