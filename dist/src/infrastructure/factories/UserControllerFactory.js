"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUserController = makeUserController;
const UserRepository_1 = require("../../Application/use-cases/repositories/UserRepository");
const CreateUser_1 = require("../../Application/use-cases/CreateUser");
const UserController_1 = require("../web/controllers/UserController");
function makeUserController() {
    const userRepository = new UserRepository_1.UserRepository(); // Interface é usada para o repositório
    const createUserUseCase = new CreateUser_1.CreateUser(userRepository); // Use Case recebe a interface
    return new UserController_1.UserController(createUserUseCase); // Controller recebe o Use Case
}
