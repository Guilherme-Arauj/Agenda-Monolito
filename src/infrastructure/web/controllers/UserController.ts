//Aqui é o arquivo de controller do usuário, aqui será o controle das requisições e suas respostas no servidor;
//Aqui o DTO é criado e então o use-case é instanciado para então devolver ao servidor a response proveniente da lógica de negócio no use-case;
import { CreateUser } from "../../../Application/use-cases/CreateUser";
import { CreateUserDTO } from "../../../Application/dtos/UserDTO";
import { Request, Response } from 'express';
import { User } from "../../../Domain/entities/User";
import { isNumberObject } from "util/types";
import { validateDTO } from "../../utils/zod/zodRegisterValidation";

export class UserController{
    private createUserUseCase: CreateUser

    constructor(createUserUseCase: CreateUser){
        this.createUserUseCase = createUserUseCase;
    }

    public async create(req: Request, res: Response): Promise <void>{
        try {
            const { name, email, password } = req.body;

            // Criação do schema para validação
            const reqSchema = { email, name, password };

            // Validação assíncrona do DTO
            const validatedData = await validateDTO(reqSchema, res);
            if (!validatedData) return;  // Se os dados forem inválidos, a resposta já foi enviada.

            // Criação do DTO
            const dto = new CreateUserDTO(validatedData.name, validatedData.email, validatedData.password);

            // Instanciando e Armazenando o Use Case
            const userResponse = await this.createUserUseCase.execute(dto);

            // Response com mensagem de sucesso
            res.status(201).json({
                message: "Cadastro realizado com sucesso!",
                user: userResponse
            });
        } catch (error) {
            console.error('Erro ao processar requisição:', error);
            res.status(400).json({ message: "Erro ao criar usuário"});
        } 
    }
}