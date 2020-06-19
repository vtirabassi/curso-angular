"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = (function () {
    function User(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
    User.prototype.existe = function (user) {
        return user !== undefined && user.email === this.email && user.password === this.password;
    };
    return User;
}());
exports.User = User;
exports.users = [
    new User('vinicius', 'testeVini@hotmail.com', 'testeVini123'),
    new User('sthefanie', 'testeSthe@hotmail.com', 'testeSthe123')
];
