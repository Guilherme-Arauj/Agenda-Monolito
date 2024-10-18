"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDTOLogin = validateDTOLogin;
const zod_1 = require("zod");
async function validateDTOLogin(reqSchema, res) {
    const userSchema = zod_1.z.object({
        email: zod_1.z.string().email("[Formato de email inválido]"),
        password: zod_1.z.string().min(6, "[Senha deve ter no mínimo 6 caracteres]"),
    });
    try {
        const user = userSchema.parse(reqSchema);
        return user;
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
