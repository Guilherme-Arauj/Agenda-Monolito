"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCreateUserController = makeCreateUserController;
const UserRepository_1 = require("../../Application/use-cases/repositories/UserRepository");
const CreateUser_1 = require("../../Application/use-cases/CreateUser");
const UserController_1 = require("../web/controllers/UserController");
const BcryptConfig_1 = require("../utils/bcrypt/BcryptConfig");
const UuidConfig_1 = require("../utils/uuid/UuidConfig");
const PrismaConfig_1 = require("../database/PrismaConfig");
const Login_1 = require("../../Application/use-cases/Login");
function makeCreateUserController() {
    const prismaConfig = new PrismaConfig_1.PrismaConfig();
    const userRepository = new UserRepository_1.UserRepository(prismaConfig);
    const bcryptConfig = new BcryptConfig_1.BcryptConfig();
    const uuidConfig = new UuidConfig_1.UuidConfig();
    const createUserUseCase = new CreateUser_1.CreateUser(userRepository, bcryptConfig, uuidConfig); // Use Case recebe a interface
    const loginUseCase = new Login_1.Login(userRepository, bcryptConfig);
    return new UserController_1.UserController(createUserUseCase, loginUseCase); // Controller recebe os Use Cases
}
