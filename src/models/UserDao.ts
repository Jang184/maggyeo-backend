import { Participate, PresentList, PresentDetail, User } from "../entities";
import { Database } from "../config/database";

export default class UserDao {
    constructor(private db: Database) {
        this.db = db;
    }

    async createUser(data) {
        const { name, email, profile_url } = data;
        const result = await this.db.withTransaction(async (qr) => {
            const userRepository = qr.manager.getRepository(User);
            const user = new User();
            user.name = name;
            user.email = email;
            user.profileUrl = profile_url;

            await userRepository.save(user);

            return user;
        });
        return result;
    }

    async getUserInfo(userId: number) {
        const result = await this.db.query(async (connection) => {
            // {id:2, name:Juri}
            const user: User = await connection
                .createQueryBuilder(User, "user")
                .select([
                    "user.id",
                    "user.name",
                    "user.email",
                    "user.profile_url"
                ])
                .where("user.id = :id", { id: userId })
                .getOne();

            if (user == null) {
                throw new Error(`User id ${userId} does not exist.`);
            }
            return user;
        });
        return result;
    }
    // TODO:pagination
    async getUserList(userId: number) {
        const result = await this.db.query(async (connection) => {
            // [{id:1, name:test, description:test, createdAt:...}]
            const userList: PresentList = await connection
                .createQueryBuilder(PresentList, "list")
                .select(["list.id", "detail.id", "part.id"])
                .leftJoin(
                    "list.presentDetail",
                    "detail",
                    "list.id = detail.list_id"
                )
                .leftJoin(Participate, "part", "detail.id = part.detail_id")
                .where("list.user_id = :id", { id: userId })
                .getMany();

            return userList;
        });
        return result;
    }

    // List user participated
    // output ::
    async getUserParticipate(userId: number) {
        const result = await this.db.query(async (connection) => {
            const userParticipate = await connection
                .createQueryBuilder(Participate, "part")
                .select(["part.id", "detail.id", "list.id"])
                .leftJoin("part.presentDetail", "detail")
                .leftJoin("detail.presentList", "list")
                .where("part.user_id = :id", { id: userId })
                .getMany();
            return userParticipate;
        });

        return result;
    }

    // Message user received
    async getUserReceivedMessage(userId: number) {
        const result = await this.db.query(async (connection) => {
            const message = await connection
                .createQueryBuilder(Participate, "part")
                .leftJoinAndSelect("part.presentDetail", "detail")
                .leftJoinAndSelect("detail.presentList", "list")
                .where("list.user_id = :id", { id: userId })
                .getMany();
            return message;
        });
        return result;
    }

    async patchUser(userId, data) {
        const result = await this.db.withTransaction(async (qr) => {
            const update = await qr.manager.update(User, userId, data);

            return update;
        });
        return result;
    }
}
