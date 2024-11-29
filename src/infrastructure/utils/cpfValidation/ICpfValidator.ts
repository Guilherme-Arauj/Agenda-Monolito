export interface ICpfValidator {
    validate(cpf: string, userId: string): Promise<void>;
    updateValidation(cpf: string, userId: string, contactId: string): Promise<void>;
}