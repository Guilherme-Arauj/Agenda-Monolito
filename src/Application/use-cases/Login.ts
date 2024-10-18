import { IBcryptConfig } from "../../infrastructure/utils/bcrypt/IBcryptConfig";
import { UserLoginDTO } from "../dtos/UserDTO";
import { IUserRepository } from "./repositories/IUserRepository";


export class Login {
    constructor(
        private userRepository: IUserRepository,
        private bc: IBcryptConfig,
    ){}

    public async execute(dto: UserLoginDTO): Promise <any>{
        const userValidation = await this.userRepository.validate(dto.email);

        if(!userValidation){
            throw new Error("[Usuário não encontrado no banco de dados]");
        }

        const passwordCompare = await this.bc.compare(dto.password, userValidation.password);

        if(!passwordCompare){
            throw new Error("[Senha incorreta]")
        }

        
    }
}