"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUser = void 0;
// Arquivo referente ao Use-Case de criação do usuário;
//Importando A entidade usuário, o repositório do usuário e os DTO´s necessários para executar a funcionalidade do use-case; Importando Utils de UUID e Bcrypt
const User_1 = require("../../Domain/entities/User");
const UserDTO_1 = require("../dtos/UserDTO");
class CreateUser {
    constructor(userRepository, bcryptConfig, uuidConfig) {
        this.userRepository = userRepository;
        this.bcryptConfig = bcryptConfig;
        this.uuidConfig = uuidConfig;
    }
    async execute(dto) {
        const userValidation = await this.userRepository.validate(dto.email);
        if (userValidation) {
            throw new Error("[Email de usuário já presente no Banco de dados]");
        }
        const hashedPassword = await this.bcryptConfig.hash(dto.password, 10);
        const id = await this.uuidConfig.generateId();
        const user = new User_1.User({
            id: id,
            name: dto.name,
            email: dto.email,
            password: hashedPassword
        });
        const savedUser = await this.userRepository.create(user);
        return new UserDTO_1.UserResponseDTO(savedUser.email, savedUser.name, savedUser.id);
    }
}
exports.CreateUser = CreateUser;
