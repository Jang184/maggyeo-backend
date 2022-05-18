import { Database } from "../config/database";
import { PresentList, PresentDetail } from "../entities";

export default class PresentDao {
    constructor(private db: Database) {
        this.db = db;
    }

    async createPresentList(userId, data) {
        const result = await this.db.withTransaction(async (qr) => {
            const present = new PresentList();
            present.name = data.name;
            present.description = data.description;
            present.user = userId;
            present.presentDetail = data.presentDetail;

            await qr.manager.save(present);

            return present;
        });
        return result;
    }
    async patchPresentList(listId, data) {
        const result = await this.db.withTransaction(async (qr) => {
            const test = await qr.manager.findOne(PresentList, { id: listId });
            const update = await qr.manager.merge(PresentList, test, data);
            console.log(update);
            // const updateList = qr.manager.update(
            //     PresentList,
            //     listId,
            //     data.presentList
            // );
            // const updateDetail = data.presentDetail.map((detail) => {
            //     const detailId = detail.id;
            //     return qr.manager.update(PresentDetail, detailId, detail);
            // });

            // const update = await Promise.all([updateList, ...updateDetail]);
            await qr.manager.save(update);
            return;
        });
        return result;
    }
    async deletePresentList(listId: number) {
        await this.db.withTransaction(async (qr) => {
            await qr.manager.delete(PresentList, listId);
            return;
        });
        return;
    }

    async getPresentList(listId: number) {
        const result = await this.db.query(async (connection) => {
            const data: PresentList = await connection.manager.findOne(
                PresentList,
                {
                    where: { id: listId },
                    relations: ["user"]
                }
            );

            const presentList = {
                id: data.id,
                name: data.name,
                description: data.description,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
                presentDetail: data.presentDetail,
                userId: data.user.id
            };

            return presentList;
        });
        return result;
    }

    async getPresentLists(offset, limit, order) {
        const result = await this.db.query(async (connection) => {
            const presentLists = await connection
                .createQueryBuilder(PresentList, "list")
                .orderBy("list.createdAt", order)
                .skip(offset)
                .take(limit)
                .getMany();
            return presentLists;
        });
        return result;
    }

    async getPresentDetail(detailId) {
        const result = await this.db.query(async (connection) => {
            const presentDetail = await connection.manager.findOne(
                PresentDetail,
                { id: detailId }
            );

            return presentDetail;
        });
        return result;
    }
}
