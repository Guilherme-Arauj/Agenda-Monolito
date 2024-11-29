import { Contact } from "../../domain/entities/Contact";
import { ICpfValidator } from "../../infrastructure/utils/cpfValidation/ICpfValidator";
import { ContactResponseDTO, ContactUpdateDTO } from "../dtos/ContactDTO";
import { IContactRepository } from "./repositories/IContactRepository";


export class UpdateContact{
    constructor(
        private contactRepository: IContactRepository,
        private cpfValidator: ICpfValidator
    ){}

    public async execute(dto: ContactUpdateDTO): Promise<ContactResponseDTO>{
        const cpf = dto.cpf;
        const userId = dto.userId;
        const contactId = dto.id;
        
        
        if(cpf){
            await this.cpfValidator.updateValidation(cpf, userId, contactId);
        }
        
        const contact = new Contact({
            id: contactId,
            name: dto.name,
            age: dto.age,
            cpf: cpf,
            phone: dto.phone,
            email: dto.email,
            address: dto.address,
            socialMedia: dto.socialMedia,
            note: dto.note,
            category: dto.category,
            userId: userId
        });

        const updatedContact = await this.contactRepository.update(contact);

        return new ContactResponseDTO(
            updatedContact.id,
            updatedContact.name,
            updatedContact.email,
            updatedContact.phone,
            updatedContact.userId
        )  
    }

}