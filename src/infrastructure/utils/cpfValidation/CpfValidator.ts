import { IContactRepository } from "../../../Application/use-cases/repositories/IContactRepository";
import { ICpfValidator } from "./ICpfValidator";

export class CpfValidator implements ICpfValidator{
    constructor(private contactRepository: IContactRepository) {}


    public async updateValidation(cpf: string, userId: string, contactId: string): Promise<void> {
        const contactValidation = await this.contactRepository.validateForUpdate(cpf, userId, contactId);

        if (contactValidation !== null) {
            throw new Error("[Você já possui um contato com esse CPF]");
        }
    }

    public async validate(cpf: string, userId: string): Promise<void> {
        const contactValidation = await this.contactRepository.validate(cpf, userId);

        if (contactValidation !== null) {
            throw new Error("[Você já possui um contato com esse CPF]");
        }
    }
}
