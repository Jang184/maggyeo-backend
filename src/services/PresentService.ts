import { PresentDao } from "../models";

export class PresentService {
    presentDao: PresentDao;

    constructor(presentDao: PresentDao) {
        this.presentDao = presentDao;
    }
    createPresentList() {
        return this.presentDao.createPresentList;
    }
    patchPresentList() {
        return this.presentDao.patchPresentList;
    }
    deletePresentList() {
        return this.presentDao.deletePresentList;
    }
    getPresentList() {
        return this.presentDao.getPresentList;
    }
    getPresentDetail() {
        return this.presentDao.getPresentDetail;
    }
}
