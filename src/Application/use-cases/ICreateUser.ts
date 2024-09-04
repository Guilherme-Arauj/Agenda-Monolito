import { CreateUserDTO, UserResponseDTO } from "../dtos/UserDTO";

export interface ICreateUser {
    execute(userData: CreateUserDTO): Promise<UserResponseDTO>;
}