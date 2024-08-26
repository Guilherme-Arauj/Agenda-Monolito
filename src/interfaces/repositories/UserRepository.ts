import {User} from '../../domain/entities/User'

export interface IUserRepository{
    findById(id:string): Promise <User | null>;
    saveUser(user: User): Promise <User>;
}