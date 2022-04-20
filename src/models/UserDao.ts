import { Repository, Connection, EntityManager, QueryRunner } from "typeorm";

import { User } from "../entities";
import { Database } from "../config/database";

export default class UserDao {
    constructor(private db: Database) {
        this.db = db;
    }

    async createUser() {
        const result = await this.db.withTransaction(async (qr) => {
            const userRepository = qr.manager.getRepository(User);
            const user = new User();
            user.name = "Juri";
            user.email = "juri@naver.com";
            user.password = "1234";
            user.profileUrl = "test_url";

            await userRepository.save(user);

            return user;
        });
        return result;
    }

    async getUser(userId: number) {
        const result = await this.db.withQuery(async (mg) => {
            const userRepository = mg.getRepository(User);
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

    async patchUser(userId: number, request) {
        const result = await this.db.withTransaction(async (qr) => {
            const userRepository = qr.manager.getRepository(User);
            const user = await userRepository.findOne({ id: userId });

            if (user == null) {
                throw new Error(`User id ${userId} does not exist.`);
            }
        });

        return result;
    }
}
