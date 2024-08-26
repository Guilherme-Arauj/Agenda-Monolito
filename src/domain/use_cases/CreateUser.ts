import {IUser, User} from "../entities/User";
import { IUserRepository } from "../../interfaces/repositories/UserRepository";

export class CreateUser {
   private userRepository: IUserRepository;
   private salt = 10;

   constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
   }

   async execute(userData: IUser): Promise <User>{
        

        const user = new User(userData);



        return await this.userRepository.saveUser(user);
   }
}