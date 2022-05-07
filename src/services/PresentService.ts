import { PresentDao } from "../models";

interface createPresentListInput {
    name: string;
    description: string;
    presentDetail: [
        {
            url: string;
            price: number;
            description: string;
            countLimit: number;
        }
    ];
}

interface patchPresentListInput {
    name?: string;
    description?: string;
    presentDetail?: [
        {
            url?: string;
            price?: number;
            description?: string;
            countLimit?: number;
        }
    ];
}

export class PresentService {
    presentDao: PresentDao;

    constructor(presentDao: PresentDao) {
        this.presentDao = presentDao;
    }
    createPresentList(userId: number, data: createPresentListInput) {
        return this.presentDao.createPresentList(userId, data);
    }
    patchPresentList(listId: number, data: patchPresentListInput) {
        return this.presentDao.patchPresentList(listId, data);
    }
    deletePresentList(listId: number) {
        return this.presentDao.deletePresentList(listId);
    }
    getPresentList(listId: number) {
        return this.presentDao.getPresentList(listId);
    }
    getPresentLists() {
        return this.presentDao.getPresentLists();
    }
}
