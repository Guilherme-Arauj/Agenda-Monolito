"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserDTO_1 = require("../../../Application/dtos/UserDTO");
const zodRegisterValidation_1 = require("../../utils/zod/zodRegisterValidation");
class UserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }
    async create(req, res) {
        try {
            const { name, email, password } = req.body;
            // Criação do schema para validação
            const reqSchema = { email, name, password };
            // Validação assíncrona do DTO
            const validatedData = await (0, zodRegisterValidation_1.validateDTO)(reqSchema, res);
            if (!validatedData)
                return; // Se os dados forem inválidos, a resposta já foi enviada.
            // Criação do DTO
            const dto = new UserDTO_1.CreateUserDTO(validatedData.name, validatedData.email, validatedData.password);
            // Instanciando e Armazenando o Use Case
            const userResponse = await this.createUserUseCase.execute(dto);
            // Response com mensagem de sucesso
            res.status(201).json({
                message: "Cadastro realizado com sucesso!",
                user: userResponse
            });
        }
        catch (error) {
            console.error('Erro ao processar requisição:', error);
            res.status(400).json({ message: "Erro ao criar usuário" });
        }
    }
}
exports.UserController = UserController;
