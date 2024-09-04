import { UserRepository } from "../../Domain/repositories/UserRepository";
import { UserRepositoryImpl } from "../../Interface-Adaptors/gateways/UserRepositoryImpl";
import { CreateUser } from "../../Application/use-cases/CreateUser";
import { UserController } from "../../Interface-Adaptors/controllers/UserController";

export function makeUserController(): UserController {
    const userRepository: UserRepository = new UserRepositoryImpl(); // Interface é usada para o repositório
    const createUserUseCase = new CreateUser(userRepository); // Use Case recebe a interface
    return new UserController(createUserUseCase); // Controller recebe o Use Case
}
