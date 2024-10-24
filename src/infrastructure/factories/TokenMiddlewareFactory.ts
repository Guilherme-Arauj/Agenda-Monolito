import { TokenMiddleware } from '../../Application/middleware/TokenMiddleware';
import { IUserRepository } from '../../Application/use-cases/repositories/IUserRepository';
import { UserRepository } from '../../Application/use-cases/repositories/UserRepository';
import { IJwtConfig } from '../../infrastructure/utils/jwt/IJwtConfig';
import { IPrismaConfig } from '../database/IPrismaConfig';
import { PrismaConfig } from '../database/PrismaConfig';
import { JwtConfig } from '../utils/jwt/JwtConfig';

export function TokenMiddlewareFactory(): TokenMiddleware{
    const prismaConfig: IPrismaConfig = new PrismaConfig();
    const secretKey = process.env.SECRET_KEY as string;
    
    const userRepository: IUserRepository = new UserRepository(prismaConfig);
    const jwtConfig: IJwtConfig = new JwtConfig(secretKey);

    return new TokenMiddleware(userRepository, jwtConfig);
}