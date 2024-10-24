"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDTOContactView = validateDTOContactView;
const zod_1 = require("zod");
function validateDTOContactView(reqSchema, res) {
    const contactViewSchema = zod_1.z.object({
        id: zod_1.z.string()
    });
    try {
        const contactView = contactViewSchema.parse(reqSchema);
        return contactView;
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
