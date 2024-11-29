import { z } from "zod";

export function validateDTOContact(reqSchema: Object, res: any) {
    const contactSchema = z.object({
        name: z.string().min(1, "[Nome é obrigatório]"),
        age: z.number(),
        cpf: z.string(),
        phone: z.string().min(1, "[Telefone é obrigatório]"),
        email: z.string().min(1, "[Email é obrigatório]").email("[Formato de email inválido]"),
        address: z.string(),
        socialMedia: z.string(),
        note: z.string(),
        category: z.string(),
        userId: z.string()
    });
    try {
        const contact = contactSchema.parse(reqSchema);
        return contact;
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors.map((err: any) => ({
                path: err.path.join('.'),
                message: err.message,
            }));
            console.error("Erro de validação:", JSON.stringify(errorMessages, null, 2));
        } else {
            console.error("Erro desconhecido:", error);
        }
        throw new Error("Dados inválidos");
    }
}