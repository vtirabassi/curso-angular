"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var app_config_1 = require("./app-config");
exports.autorizacaoLogin = function (req, resp, next) {
    var token = extractToken(req);
    if (!token) {
        resp.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"');
        resp.status(401).json({ message: 'Você precisa se autenticar.' });
    }
    else {
        jwt.verify(token, app_config_1.apiConfig.secret, function (error, decoded) {
            if (decoded) {
                next();
            }
            else {
                resp.status(403).json({ message: 'Você não possui acesso.' });
            }
        });
    }
};
function extractToken(req) {
    var token = undefined;
    var authorization = req.headers.authorization;
    if (req.headers && authorization) {
        var parts = authorization.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
    }
    return token;
}
