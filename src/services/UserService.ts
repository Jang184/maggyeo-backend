import { UserDao } from "../models";

export interface createUserInput {
    name: string;
    email: string;
    profileUrl: string;
}

export interface patchUserInput {
    name?: string;
    email?: string;
    profileUrl?: string;
}

export class UserService {
    userDao: UserDao;

    constructor(userDao: UserDao) {
        this.userDao = userDao;
    }
    createUser(data: createUserInput) {
        return this.userDao.createUser(data);
    }
    getUserInfo(userId: number) {
        return this.userDao.getUserInfo(userId);
    }
    getUserList(userId: number) {
        return this.userDao.getUserList(userId);
    }
    getUserParticipate(userId: number) {
        return this.userDao.getUserParticipate(userId);
    }
    getUserReceivedMessage(userId: number) {
        return this.userDao.getUserReceivedMessage(userId);
    }
    patchUser(userId: number, data: patchUserInput) {
        return this.userDao.patchUser(userId, data);
    }
}
