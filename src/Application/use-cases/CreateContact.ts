import { log } from "console";
import {Contact} from "../../domain/entities/Contact"
import { IUuidConfig } from "../../infrastructure/utils/uuid/IUuidConfig";
import { ContactDTO, ContactResponseDTO } from "../dtos/ContactDTO";
import { IContactRepository } from "./repositories/IContactRepository";
import { ICpfValidator } from "../../infrastructure/utils/cpfValidation/ICpfValidator";

export class CreateContact{
    constructor(
        private contactRepository: IContactRepository,
        private uuidConfig: IUuidConfig,
        private cpfValidator: ICpfValidator
    ){}

    public async execute(dto: ContactDTO): Promise<ContactResponseDTO>{
        const cpf = dto.cpf;
        const userId = dto.userId;
        
        
        if(cpf){
            await this.cpfValidator.validate(cpf, userId);
        }

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
            category: dto.category,
            userId: userId
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