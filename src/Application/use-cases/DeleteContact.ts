import {Contact} from "../../domain/entities/Contact"
import { ContactDeleteDTO } from "../dtos/ContactDTO";
import { IContactRepository } from "./repositories/IContactRepository";


export class DeleteContact{
    constructor(
        private contactRepository: IContactRepository, 
    ){}

    public async execute(dto: ContactDeleteDTO): Promise<Contact>{

        const savedUser = await this.contactRepository.delete(dto.contactId);

        return savedUser;
    }
}