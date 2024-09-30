"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const validateDTOContact_1 = require("../../utils/zod/validateDTOContact");
const ContactDTO_1 = require("../../../Application/dtos/ContactDTO");
class ContactController {
    constructor(createContactUseCase) {
        this.createContactUseCase = createContactUseCase;
    }
    async create(req, res) {
        try {
            console.log("oi");
            const { name, age, cpf, phone, email, address, socialMedia, note, userId } = req.body;
            const reqSchema = {
                name,
                age,
                cpf,
                phone,
                email,
                address,
                socialMedia,
                note,
                userId
            };
            const validatedData = await (0, validateDTOContact_1.validateDTOContact)(reqSchema, res);
            if (!validatedData)
                return;
            const dto = new ContactDTO_1.ContactDTO(validatedData.name, validatedData.age, validatedData.cpf, validatedData.phone, validatedData.email, validatedData.address, validatedData.socialMedia, validatedData.note, validatedData.userId);
            const userResponse = await this.createContactUseCase.execute(dto);
            res.status(201).json({
                message: "Cadastro de contato realizado com sucesso!",
                user: userResponse
            });
        }
        catch (error) {
            console.error('Erro ao processar requisição:', error);
            res.status(400).json({ message: "Erro ao criar contato" });
        }
    }
}
exports.ContactController = ContactController;
