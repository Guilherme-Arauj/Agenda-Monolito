//Aqui é o arquivo de controller do usuário, aqui será o controle das requisições e suas respostas no servidor;
//Aqui o DTO é criado e então o use-case é instanciado para então devolver ao servidor a response proveniente da lógica de negócio no use-case;
import { CreateUser } from "../../Application/use-cases/CreateUser";
import { CreateUserDTO } from "../../Application/dtos/UserDTO";
import { Request, Response } from 'express';
import { User } from "../../Domain/entities/User";
import { isNumberObject } from "util/types";

export class UserController{
    private createUserUseCase: CreateUser

    constructor(createUserUseCase: CreateUser){
        this.createUserUseCase = createUserUseCase;
    }

    public async create(req: Request, res: Response): Promise <void>{
        try {
            //Criação do DTO;

            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;

            const dto = new CreateUserDTO(name, email, password);

            //Instanciando e Armazenando o Use-Case
            const userResponse = await this.createUserUseCase.execute(dto);

            //Response
            res.status(201).json(userResponse);
        } catch (error) {
            console.error('Erro ao processar requisição:', error);
            res.status(400).json({ message: "Erro ao criar usuário"});
        } 
    }
}