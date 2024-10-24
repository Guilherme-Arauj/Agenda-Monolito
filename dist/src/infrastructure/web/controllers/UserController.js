"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserDTO_1 = require("../../../Application/dtos/UserDTO");
const validateDTOUser_1 = require("../../utils/zod/validateDTOUser");
const validateDTOLogin_1 = require("../../utils/zod/validateDTOLogin");
class UserController {
    constructor(createUserUseCase, loginUseCase) {
        this.createUserUseCase = createUserUseCase;
        this.loginUseCase = loginUseCase;
    }
    async create(req, res) {
        try {
            const { name, email, password } = req.body;
            // Criação do schema para validação
            const reqSchema = { email, name, password };
            // Validação assíncrona do DTO
            const validatedData = await (0, validateDTOUser_1.validateDTOUser)(reqSchema, res);
            if (!validatedData)
                return; // Se os dados forem inválidos, a resposta já foi enviada.
            // Criação do DTO
            const dto = new UserDTO_1.UserDTO(validatedData.name, validatedData.email, validatedData.password);
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
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const reqSchema = { email, password };
            const validatedData = await (0, validateDTOLogin_1.validateDTOLogin)(reqSchema, res);
            if (!validatedData)
                return;
            const dto = new UserDTO_1.UserLoginDTO(validatedData.email, validatedData.password);
            const userResponse = await this.loginUseCase.execute(dto);
            if (!userResponse) {
                return res.status(401).json({ message: "Credenciais inválidas" });
            }
            res.status(201).json({
                message: "Login realizado com sucesso!",
                user: userResponse
            });
        }
        catch (error) {
            console.error('Erro ao processar requisição:', error);
            res.status(400).json({ message: "Erro realizar Login" });
        }
    }
}
exports.UserController = UserController;
