// Arquivo referente ao Use-Case de criação do usuário;
//Importando A entidade usuário, o repositório do usuário e os DTO´s necessários para executar a funcionalidade do use-case; Importando Utils de UUID e Bcrypt
import {User} from "../../domain/entities/User";
import { IUserRepository } from "./repositories/IUserRepository";
import { UserDTO, UserResponseDTO } from "../dtos/UserDTO";
import { IBcryptConfig } from "../../infrastructure/utils/bcrypt/IBcryptConfig";
import { IUuidConfig } from "../../infrastructure/utils/uuid/IUuidConfig";


export class CreateUser{
    constructor(
        private userRepository: IUserRepository, 
        private bcryptConfig: IBcryptConfig, 
        private uuidConfig: IUuidConfig
    ){}

    public async execute(dto: UserDTO): Promise <UserResponseDTO>{
        const userValidation = await this.userRepository.validate(dto.email);
        
        if(userValidation){
            throw new Error("[Email de usuário já presente no Banco de dados]");
        }

        const hashedPassword = await this.bcryptConfig.hash(dto.password, 10);
        const id = await this.uuidConfig.generateId();
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