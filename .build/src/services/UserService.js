"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
class UserService {
    constructor(userDao) {
        this.userDao = userDao;
    }
    getUser(id) {
        return this.userDao.getUser(id);
    }
    createUser() {
        return this.userDao.createUser();
    }
}
exports.UserService = UserService;
