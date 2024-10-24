import {Contact} from "../../domain/entities/Contact"
import { ContactViewResponseDTO } from "../dtos/ContactDTO";
import { IContactRepository } from "./repositories/IContactRepository";


export class GetContacts{
    constructor(
        private contactRepository: IContactRepository, 
    ){}

    public async execute(dto: ContactViewResponseDTO): Promise<Contact[]>{

        const savedUser = await this.contactRepository.contactTable(dto.id);
        
        

        return savedUser;
    }
}