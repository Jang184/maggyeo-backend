"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../entities");
class UserDao {
    constructor(db) {
        this.db = db;
        this.db = db;
    }
    async createUser() {
        const result = await this.db.withTransaction(async (qr) => {
            const userRepository = qr.manager.getRepository(entities_1.User);
            const user = new entities_1.User();
            user.name = "Juri";
            user.email = "juri@naver.com";
            user.password = "1234";
            user.profileUrl = "test_url";
            await userRepository.save(user);
            return user;
        });
        return result;
    }
    async getUser(userId) {
        const result = await this.db.withQuery(async (mg) => {
            const userRepository = mg.getRepository(entities_1.User);
            const user = await userRepository.findOne({
                select: ["id", "name", "email", "profileUrl"],
                where: {
                    id: userId,
                },
            });
            if (user == null) {
                throw new Error(`User id ${userId} does not exist.`);
            }
            return user;
        });
        return result;
    }
    async patchUser(userId, request) {
        const result = await this.db.withTransaction(async (qr) => {
            const userRepository = qr.manager.getRepository(entities_1.User);
            const user = await userRepository.findOne({ id: userId });
            if (user == null) {
                throw new Error(`User id ${userId} does not exist.`);
            }
        });
        return result;
    }
}
exports.default = UserDao;
