"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseDTO = exports.UserDTO = void 0;
// DTO para criação de usuário - DTO utilizada apenas para a criação de um usuário;
class UserDTO {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}
exports.UserDTO = UserDTO;
//DTO para response - Esse DTO é para ser utilizada sempre que os dados do usuário devem ser retornados;
class UserResponseDTO {
    constructor(name, email, id) {
        this.name = name;
        this.email = email;
        this.id = id;
    }
}
exports.UserResponseDTO = UserResponseDTO;
