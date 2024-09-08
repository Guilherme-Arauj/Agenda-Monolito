import {User} from "../../../Domain/entities/User";

export interface IUserRepository {
    create(user:User): Promise <User>;
    validate(email:string): Promise <User | null>;
}