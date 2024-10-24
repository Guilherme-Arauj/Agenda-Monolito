"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateContact = void 0;
const Contact_1 = require("../../domain/entities/Contact");
const ContactDTO_1 = require("../dtos/ContactDTO");
class CreateContact {
    constructor(contactRepository, uuidConfig) {
        this.contactRepository = contactRepository;
        this.uuidConfig = uuidConfig;
    }
    async execute(dto) {
        const cpf = dto.cpf;
        let cpfValidation;
        if (cpf) {
            cpfValidation = this.cpfValidation(cpf);
            return cpfValidation;
        }
        const id = await this.uuidConfig.generateContactId();
        const contact = new Contact_1.Contact({
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
        return new ContactDTO_1.ContactResponseDTO(savedContact.id, savedContact.name, savedContact.email, savedContact.phone, savedContact.userId);
    }
    async cpfValidation(cpf) {
        const contactValidation = await this.contactRepository.validate(cpf);
        if (contactValidation) {
            throw new Error("[Cpf já presente no Banco de dados]");
        }
    }
}
exports.CreateContact = CreateContact;
