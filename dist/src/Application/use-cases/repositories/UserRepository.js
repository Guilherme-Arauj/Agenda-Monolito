"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const PrismaConfig_1 = __importDefault(require("../../../infrastructure/database/PrismaConfig"));
class UserRepository {
    async create(user) {
        return PrismaConfig_1.default.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            }
        });
    }
    async validate(email) {
        return PrismaConfig_1.default.user.findUnique({
            where: {
                email: email
            }
        });
    }
}
exports.UserRepository = UserRepository;
