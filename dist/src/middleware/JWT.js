"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const secretKey = process.env.SECRET_KEY;
const prisma = new client_1.PrismaClient();
async function verifyToken(req, res, next) {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }
    token = token.split(' ')[1];
    jsonwebtoken_1.default.verify(token, secretKey, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido ou expirado' });
        }
        const usuario = await prisma.user.findUnique({ where: { id: decoded.id } });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        // Gera um novo token com mais 30 minutos
        const novoToken = jsonwebtoken_1.default.sign({ id: usuario.id, email: usuario.email }, secretKey, { expiresIn: '30m' });
        // Adiciona o novo token no cabeçalho da resposta
        res.setHeader('Authorization', `Bearer ${novoToken}`);
        // Passa o usuário para o próximo middleware
        req.user = usuario;
        next();
    });
}
