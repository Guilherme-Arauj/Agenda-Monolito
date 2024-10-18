"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Login = void 0;
class Login {
    constructor(userRepository, bc) {
        this.userRepository = userRepository;
        this.bc = bc;
    }
    async execute(dto) {
        const userValidation = await this.userRepository.validate(dto.email);
        if (!userValidation) {
            throw new Error("[Usuário não encontrado no banco de dados]");
        }
        const passwordCompare = await this.bc.compare(dto.password, userValidation.password);
        if (!passwordCompare) {
            throw new Error("[Senha incorreta]");
        }
    }
}
exports.Login = Login;
