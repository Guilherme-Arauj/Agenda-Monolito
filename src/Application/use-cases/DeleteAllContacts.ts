import {Contact} from "../../domain/entities/Contact"
import { ContactViewResponseDTO } from "../dtos/ContactDTO";
import { IContactRepository } from "./repositories/IContactRepository";


export class DeleteAllContacts{
    constructor(
        private contactRepository: IContactRepository, 
    ){}

    public async execute(dto: ContactViewResponseDTO): Promise<{count:number}>{

        const savedUser = await this.contactRepository.deleteAll(dto.id);

        return savedUser;
    }
}