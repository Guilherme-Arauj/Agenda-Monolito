"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMiddleware = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class TokenMiddleware {
    constructor(userRepository, jwtConfig) {
        this.userRepository = userRepository;
        this.jwtConfig = jwtConfig;
        this.verifyToken = async (req, res, next) => {
            let token = req.headers.authorization;
            if (!token) {
                return res.status(401).json({ message: 'Token não fornecido' });
            }
            token = token.split(' ')[1];
            const decoded = this.jwtConfig.verify(token);
            if (!decoded || typeof decoded === 'string') {
                return res.status(401).json({ message: 'Token inválido ou expirado' });
            }
            const usuario = await this.userRepository.getUser(decoded.id);
            if (!usuario) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            const novoToken = this.jwtConfig.sign({ id: usuario.id, email: usuario.email }, '1h');
            res.setHeader('Authorization', `Bearer ${novoToken}`);
            req.user = usuario;
            next();
        };
    }
}
exports.TokenMiddleware = TokenMiddleware;
