import { Database } from "../config/database";
import { PresentList, PresentDetail } from "../entities";

export default class PresentDao {
    constructor(private db: Database) {
        this.db = db;
    }

    async createPresentList(userId, data) {
        const result = await this.db.withTransaction(async (qr) => {
            const presentListRepository = qr.manager.getRepository(PresentList);
            const present = new PresentList();
            present.name = data.name;
            present.description = data.description;
            present.user = userId;
            present.presentDetail = data.presentDetail;

            await presentListRepository.save(present);

            return present;
        });
        return result;
    }
    async patchPresentList(listId, data) {
        const result = await this.db.withTransaction(async (qr) => {
            const updateList = qr.manager.update(
                PresentList,
                listId,
                data.presentList
            );
            const updateDetail = data.presentDetail.map((detail) => {
                const detailId = detail.id;
                return qr.manager.update(PresentDetail, detailId, detail);
            });

            const update = await Promise.all([updateList, ...updateDetail]);
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
            return presentList;
        });
        return result;
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
