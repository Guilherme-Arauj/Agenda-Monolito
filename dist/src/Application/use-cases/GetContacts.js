"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetContacts = void 0;
class GetContacts {
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }
    async execute(dto) {
        const savedUser = await this.contactRepository.contactTable(dto.userId);
        return savedUser;
    }
}
exports.GetContacts = GetContacts;
