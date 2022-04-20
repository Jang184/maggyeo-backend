import { Database } from "./config/database";
import {
    UserDao
} from "./models";
import {
    UserService
} from "./services";

export class Services {
    userService: UserService;
}

const getServices = (db: Database) => {

    const userDao = new UserDao(db);

    const services: Services = new Services();

    services.userService = new UserService(userDao);

    return services;
}

export { getServices };