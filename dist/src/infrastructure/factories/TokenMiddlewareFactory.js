"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMiddlewareFactory = TokenMiddlewareFactory;
const TokenMiddleware_1 = require("../../Application/middleware/TokenMiddleware");
const UserRepository_1 = require("../../Application/use-cases/repositories/UserRepository");
const PrismaConfig_1 = require("../database/PrismaConfig");
const JwtConfig_1 = require("../utils/jwt/JwtConfig");
function TokenMiddlewareFactory() {
    const prismaConfig = new PrismaConfig_1.PrismaConfig();
    const secretKey = process.env.SECRET_KEY;
    const userRepository = new UserRepository_1.UserRepository(prismaConfig);
    const jwtConfig = new JwtConfig_1.JwtConfig(secretKey);
    return new TokenMiddleware_1.TokenMiddleware(userRepository, jwtConfig);
}
