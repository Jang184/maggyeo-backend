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

            const user: User = await userRepository.findOne({
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
    // TODO:pagination
    async getUserList(userId: number) {
        const result = await this.db.withQuery(async (mg) => {
            const presentListRepository = mg.getRepository(PresentList);

            const list: PresentList = await presentListRepository.find({
                select: ["name", "createdAt"],
                where: {
                    user: userId,
                },
            });
            return list;
        });
        return result;
    }
    // List user participated
    async getUserParticipate(userId: number) {
        const result = await this.db.withQuery(async (mg) => {
            const participateRepository = mg.getRepository(Participate);

            const participate: Participate = await participateRepository.find({
                relations: ["presentDetail", "presentDetail.presentList"],
                where: {
                    participant: userId,
                },
            });
            return participate;
        });
        return result;
    }

    // Message user received
    async getUserReceivedMessage(userId: number) {
        const result = await this.db.withQuery(async (mg) => {
            const participateRepository = mg.getRepository(Participate);

            const message = await participateRepository
                .createQueryBuilder("participate")
                // .select("participate.message", "user.name")
                .leftJoinAndSelect("participate.presentDetail", "presentDetail")
                .leftJoinAndSelect("presentDetail.presentList", "presentList")
                .leftJoinAndSelect("presentList.user", "user")
                .where("presentList.user = :userId", { userId: userId })
                .getMany();
            return message;
        });
        return result;
    }
}
