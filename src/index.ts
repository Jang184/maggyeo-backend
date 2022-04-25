import { Database } from "./config/database";
import { UserDao, PresentDao } from "./models";
import { UserService, PresentService } from "./services";

export class Services {
    userService: UserService;
    presentService: PresentService;
}

const getServices = (db: Database) => {
    const userDao = new UserDao(db);
    const presentDao = new PresentDao(db);

    const services: Services = new Services();

    services.userService = new UserService(userDao);
    services.presentService = new PresentService(presentDao);

    return services;
};

export { getServices };
