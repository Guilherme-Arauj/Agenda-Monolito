import { UserRepository } from "../../Application/use-cases/repositories/UserRepository";
import { CreateUser } from "../../Application/use-cases/CreateUser";
import { UserController } from "../web/controllers/UserController";
import { IUserRepository } from "../../Application/use-cases/repositories/IUserRepository";

export function makeUserController(): UserController {
    const userRepository: IUserRepository = new UserRepository(); // Interface é usada para o repositório
    const createUserUseCase = new CreateUser(userRepository); // Use Case recebe a interface
    return new UserController(createUserUseCase); // Controller recebe o Use Case
}
