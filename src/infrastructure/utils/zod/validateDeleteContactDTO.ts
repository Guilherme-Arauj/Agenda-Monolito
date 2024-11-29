import { z } from "zod";

export function validateDeleteContactDTO(reqSchema: Object, res: any) {
    const contactViewSchema = z.object({
        contactId: z.string()
    });
    try {
        const contactView = contactViewSchema.parse(reqSchema);
        return contactView;
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