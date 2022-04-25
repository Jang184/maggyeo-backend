import { PresentDao } from "../models";

interface createPresentListInput {
    name: string;
    description: string;
    userId: number;
    presentDetail: [
        {
            id: number;
            url: string;
            price: number;
            description: string;
            countLimit: number;
            countNow: number;
            createdAt: Date;
            updatedAt: Date;
        }
    ];
}

interface patchPresentListInput {
    name: string;
    description: string;
    presentDetail: [
        {
            id: number;
            url: string;
            price: number;
            description: string;
            countLimit: number;
            countNow: number;
            createdAt: Date;
            updatedAt: Date;
        }
    ];
}

export class PresentService {
    presentDao: PresentDao;

    constructor(presentDao: PresentDao) {
        this.presentDao = presentDao;
    }
    createPresentList(userId: number, data: createPresentListInput) {
        return this.presentDao.createPresentList(data);
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
}
