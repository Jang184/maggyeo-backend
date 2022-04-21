import { Repository, Connection, EntityManager, QueryRunner } from "typeorm";

import { Participate, PresentList, User } from "../entities";
import { Database } from "../config/database";

export default class UserDao {
    constructor(private db: Database) {
        this.db = db;
    }

    async createUser(name: string, email: string) {
        const result = await this.db.withTransaction(async (qr) => {
            const userRepository = qr.manager.getRepository(User);
            const user = new User();
            user.name = name;
            user.email = email;

            await userRepository.save(user);

            return user;
        });
        return result;
    }

    async getUser(userId: number) {
        const result = await this.db.withQuery(async (mg) => {
            const userRepository = mg.getRepository(User);
            const presentListRepository = mg.getRepository(PresentList);
            const participateRepository = mg.getRepository(Participate);

            // 회원정보
            const user: User = await userRepository.findOne({
                relations: ["presents"],
                select: ["id", "name", "email", "profileUrl"],
                where: {
                    id: userId,
                },
            });

            // 참여목록
            const participate: Participate[] = await participateRepository.find(
                {
                    relations: ["participant", "presentList"],
                    where: {
                        participant: user,
                    },
                    select: ["message", "presentList.name", "presentList.url"],
                    order: {
                        createdAt: "DESC",
                    },
                }
            );
            // 메시지
            const message = await participateRepository.find({});

            // 내 리스트
            const presentList: PresentList = await presentListRepository.find({
                where: {
                    user: user,
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
