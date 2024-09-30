import {Contact} from "../../domain/entities/Contact"
import { IUuidConfig } from "../../infrastructure/utils/uuid/IUuidConfig";
import { ContactDTO, ContactResponseDTO } from "../dtos/ContactDTO";
import { IContactRepository } from "./repositories/IContactRepository";

export class CreateContact{
    constructor(
        private contactRepository: IContactRepository,
        private uuidConfig: IUuidConfig
    ){}

    public async execute(dto: ContactDTO): Promise<ContactResponseDTO>{
        const id = await this.uuidConfig.generateContactId();

        const contact = new Contact({
            id: id,
            name: dto.name,
            age: dto.age,
            cpf: dto.cpf,
            phone: dto.phone,
            email: dto.email,
            address: dto.address,
            socialMedia: dto.socialMedia,
            note: dto.note,
            userId: dto.userId
        });

        const savedContact = await this.contactRepository.create(contact);
        return new ContactResponseDTO(
            savedContact.id,
            savedContact.name,
            savedContact.email,
            savedContact.phone,
            savedContact.userId
        )
    }    
}