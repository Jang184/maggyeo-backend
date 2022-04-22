import { UserDao } from "../models";

export class UserService {
    userDao: UserDao;

    constructor(userDao: UserDao) {
        this.userDao = userDao;
    }
    createUser(name: string, email: string, profile_url: string) {
        return this.userDao.createUser(name, email);
    }
    getUser(userId: number) {
        const user = this.userDao.getUserReceivedMessage(userId);
        // const user = {
        //     userInfo: this.userDao.getUser(userId),
        //     userList: this.userDao.getUserList(userId),
        //     userParticipate: this.userDao.getUserParticipate(userId),
        //     userReceivedMessage: this.userDao.getUserReceivedMessage(userId),
        // };
        return user;
    }
    patchUser(
        userId: number,
        name?: string,
        email?: string,
        profile_url?: string
    ) {
        return this.userDao.patchUser(userId, name, email, profile_url);
    }
}
