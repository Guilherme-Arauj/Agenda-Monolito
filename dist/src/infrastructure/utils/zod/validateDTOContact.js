"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDTOContact = validateDTOContact;
const zod_1 = require("zod");
function validateDTOContact(reqSchema, res) {
    const contactSchema = zod_1.z.object({
        name: zod_1.z.string().min(1, "[Nome é obrigatório]"),
        age: zod_1.z.number(),
        cpf: zod_1.z.string(),
        phone: zod_1.z.string().min(1, "[Telefone é obrigatório]"),
        email: zod_1.z.string().min(1, "[Email é obrigatório]").email("[Formato de email inválido]"),
        address: zod_1.z.string(),
        socialMedia: zod_1.z.string(),
        note: zod_1.z.string(),
        userId: zod_1.z.string()
    });
    try {
        const contact = contactSchema.parse(reqSchema);
        return contact;
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            const errorMessages = error.errors.map((err) => ({
                path: err.path.join('.'),
                message: err.message,
            }));
            console.error("Erro de validação:", JSON.stringify(errorMessages, null, 2));
        }
        else {
            console.error("Erro desconhecido:", error);
        }
        throw new Error("Dados inválidos");
    }
}
