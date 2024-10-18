import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import "./types/index.js"

const secretKey = process.env.SECRET_KEY as string;
const prisma = new PrismaClient();

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  token = token.split(' ')[1];

  jwt.verify(token, secretKey, async (err, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido ou expirado' });
    }

    const usuario = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const novoToken = jwt.sign({ id: usuario.id, email: usuario.email }, secretKey, { expiresIn: '1h' });

    res.setHeader('Authorization', `Bearer ${novoToken}`);
    
    req.user = usuario;
    next();
  });
}
