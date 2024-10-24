//Aqui é o arquivo de controller do usuário, aqui será o controle das requisições e suas respostas no servidor;
//Aqui o DTO é criado e então o use-case é instanciado para então devolver ao servidor a response proveniente da lógica de negócio no use-case;
import { CreateUser } from "../../../Application/use-cases/CreateUser";
import { UserDTO, UserLoginDTO } from "../../../Application/dtos/UserDTO";
import { Request, Response } from 'express';
import { User } from "../../../domain/entities/User";
import { isNumberObject } from "util/types";
import { validateDTOUser } from "../../utils/zod/validateDTOUser";
import { validateDTOLogin } from "../../utils/zod/validateDTOLogin";
import { Login } from "../../../Application/use-cases/Login";

export class UserController {
    private createUserUseCase: CreateUser
    private loginUseCase: Login

    constructor(createUserUseCase: CreateUser, loginUseCase: Login) {
        this.createUserUseCase = createUserUseCase;
        this.loginUseCase = loginUseCase;
    }

    public async create(req: Request, res: Response): Promise<any> {
        try {
            const { name, email, password } = req.body;

            // Criação do schema para validação
            const reqSchema = { email, name, password };

            // Validação assíncrona do DTO
            const validatedData = await validateDTOUser(reqSchema, res);
            if (!validatedData) return;  // Se os dados forem inválidos, a resposta já foi enviada.

            // Criação do DTO
            const dto = new UserDTO(validatedData.name, validatedData.email, validatedData.password);

            // Instanciando e Armazenando o Use Case
            const userResponse = await this.createUserUseCase.execute(dto);

            // Response com mensagem de sucesso
            res.status(201).json({
                message: "Cadastro realizado com sucesso!",
                user: userResponse
            });
        } catch (error) {
            console.error('Erro ao processar requisição:', error);
            res.status(400).json({ message: "Erro ao criar usuário" });
        }
    }

    public async login(req: Request, res: Response): Promise<any> {
        try {
            const {email, password} = req.body;

            const reqSchema = { email, password};

            const validatedData = await validateDTOLogin(reqSchema, res);
            if (!validatedData) return;

            const dto = new UserLoginDTO(validatedData.email, validatedData.password);

            const userResponse = await this.loginUseCase.execute(dto);

            if (!userResponse) {
                return res.status(401).json({ message: "Credenciais inválidas" });
            }
    

            res.status(201).json({
                message: "Login realizado com sucesso!",
                user: userResponse
            });

        } catch (error) {
            console.error('Erro ao processar requisição:', error);
            res.status(400).json({ message: "Erro realizar Login" });
        }
    }
}