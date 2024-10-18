"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
require("./types/index.js");
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
        const novoToken = jsonwebtoken_1.default.sign({ id: usuario.id, email: usuario.email }, secretKey, { expiresIn: '1h' });
        res.setHeader('Authorization', `Bearer ${novoToken}`);
        req.user = usuario;
        next();
    });
}
