import { UserDao } from "../models";

export class UserService {
    userDao: UserDao;

    constructor(userDao: UserDao) {
        this.userDao = userDao;
    }

    getUser(id: number) {
        return this.userDao.getUser(id);
    }
    createUser() {
        return this.userDao.createUser();
    }
}
