import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { IJwtConfig } from '../../infrastructure/utils/jwt/IJwtConfig'; 
import { IUserRepository } from '../use-cases/repositories/IUserRepository';

const prisma = new PrismaClient();

export class TokenMiddleware {
  constructor(
    private userRepository: IUserRepository,
    private jwtConfig: IJwtConfig
  ) {}

  public verifyToken = async(req: Request, res: Response, next: NextFunction) =>{
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    token = token.split(' ')[1];

    const decoded = this.jwtConfig.verify(token);
    if (!decoded || typeof decoded === 'string') {
      return res.status(401).json({ message: 'Token inválido ou expirado' });
    }

    const usuario = await this.userRepository.getUser((decoded as any).id)

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const novoToken = this.jwtConfig.sign({ id: usuario.id, email: usuario.email }, '1h');

    res.setHeader('Authorization', `Bearer ${novoToken}`);
    
    req.user = usuario;
    next();
  }
}
