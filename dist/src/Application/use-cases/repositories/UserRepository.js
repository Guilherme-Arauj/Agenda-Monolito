"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
class UserRepository {
    constructor(prismaConfig) {
        this.prismaConfig = prismaConfig;
    }
    get prisma() {
        return this.prismaConfig.prisma;
    }
    async create(user) {
        return this.prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
            }
        });
    }
    async validate(email) {
        return this.prisma.user.findUnique({
            where: {
                email: email
            }
        });
    }
    async getUser(id) {
        return this.prisma.user.findUnique({
            where: {
                id: id
            }
        });
    }
}
exports.UserRepository = UserRepository;
