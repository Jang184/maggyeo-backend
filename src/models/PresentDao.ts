import { Database } from "../config/database";
import { PresentList } from "../entities";

export default class PresentDao {
    constructor(private db: Database) {
        this.db = db;
    }

    async createPresentList(data) {
        const result = await this.db.withTransaction(async (qr) => {
            const present = qr.manager.insert(PresentList, data);

            return present;
        });
        return result;
    }
    async patchPresentList(listId, data) {
        const result = await this.db.withTransaction(async (qr) => {
            const update = await qr.manager.update(PresentList, listId, data);

            return update;
        });
        return result;
    }
    async deletePresentList(listId: number) {
        await this.db.withTransaction(async (qr) => {
            const presentListRepository = qr.manager.getRepository(PresentList);
            await presentListRepository.delete({
                listId: listId
            });
            return;
        });
        return;
    }

    async getPresentList(listId: number) {
        const result = await this.db.query(async (connection) => {
            const presentList = await connection
                .createQueryBuilder(PresentList, "list")
                .leftJoinAndSelect("list.presentDetail", "detail")
                .where("list.id = :id", { id: listId })
                .getOne();
        });
    }

    // TODO : pagination
    async getPresentLists() {
        const result = await this.db.query(async (connection) => {
            const presentLists = await connection
                .createQueryBuilder(PresentList, "list")
                // .leftJoinAndSelect("list.presentDetail", "detail")
                .orderBy()
                .getMany();
            return presentLists;
        });
        return result;
    }
}
