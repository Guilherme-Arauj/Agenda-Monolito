// Arquivo referente ao Use-Case de criação do usuário;
//Importando A entidade usuário, o repositório do usuário e os DTO´s necessários para executar a funcionalidade do use-case; Importando Utils de UUID e Bcrypt
import {User} from "../../Domain/entities/User";
import { UserRepository } from "../../Domain/repositories/UserRepository";
import { hashPassword } from "../../infrastructure/utils/BcryptConfig";
import { generateId } from "../../infrastructure/utils/UuidConfig";
import { CreateUserDTO, UserResponseDTO } from "../dtos/UserDTO";
import { ICreateUser } from "./ICreateUser";

export class CreateUser implements ICreateUser{
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository){
        this.userRepository = userRepository;
    }
    
    public async execute(dto: CreateUserDTO): Promise <UserResponseDTO>{
        const userValidation = await this.userRepository.validate(dto.email);
        
        if(userValidation){
            throw new Error("[Email de usuário já presente no Banco de dados]")
        }

        const hashedPassword = await hashPassword(dto.password);
        const id = await generateId();
        const user = new User({
            id: id,
            name: dto.name,
            email: dto.email,
            password: hashedPassword
        });
        

        const savedUser = await this.userRepository.create(user);
        return new UserResponseDTO(savedUser.email, savedUser.name, savedUser.id);
    }
}