"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServices = exports.Services = void 0;
const models_1 = require("./models");
const services_1 = require("./services");
class Services {
}
exports.Services = Services;
const getServices = (db) => {
    const userDao = new models_1.UserDao(db);
    const services = new Services();
    services.userService = new services_1.UserService(userDao);
    return services;
};
exports.getServices = getServices;
