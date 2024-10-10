"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactResponseDTO = exports.ContactViewResponseDTO = exports.ContactDTO = void 0;
class ContactDTO {
    constructor(name, age, cpf, phone, email, address, socialMedia, note, userId) {
        this.name = name;
        this.age = age;
        this.cpf = cpf;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.socialMedia = socialMedia;
        this.note = note;
        this.userId = userId;
    }
}
exports.ContactDTO = ContactDTO;
class ContactViewResponseDTO {
    constructor(userId) {
        this.userId = userId;
    }
}
exports.ContactViewResponseDTO = ContactViewResponseDTO;
class ContactResponseDTO {
    constructor(id, name, email, phone, userId) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.userId = userId;
    }
}
exports.ContactResponseDTO = ContactResponseDTO;
