import { Database } from "../config/database";

export default class PresentDao {
    constructor(private db: Database) {
        this.db = db;
    }

    async createPresentList() {}
    async patchPresentList() {}
    async deletePresentList(listId: number) {}

    async getPresentList(listId: number) {}
    async getPresentDetail(detailId: number) {}
}
