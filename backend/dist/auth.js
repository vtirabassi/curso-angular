"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var users_1 = require("./users");
var jwt = require("jsonwebtoken");
var app_config_1 = require("./app-config");
exports.autenticacaoLogin = function (req, resp) {
    var user = req.body;
    if (isValid(user)) {
        var dbUser = users_1.users.filter(function (u) { return u.email === user.email; })[0];
        var accessToken = jwt.sign({ sub: dbUser.email, iss: 'meat-api' }, app_config_1.apiConfig.secret);
        resp.status(200).json({ name: dbUser.name, email: dbUser.email, accessToken: accessToken });
    }
    else {
        resp.status(403).json({ message: "Usuario invalido!" });
    }
};
function isValid(user) {
    user.email;
    var dbUser = users_1.users.filter(function (u) { return u.email === user.email; })[0];
    return dbUser !== undefined && dbUser.existe(user);
}
