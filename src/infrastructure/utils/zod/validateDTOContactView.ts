import { z } from "zod";

export function validateDTOContactView(reqSchema: Object, res: any) {
    const contactViewSchema = z.object({
        userId: z.string()
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