"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUser = void 0;
const middy_1 = __importDefault(require("middy"));
const middlewares_1 = require("middy/middlewares");
const middlewares_2 = require("../utils/middlewares");
const database_1 = require("../config/database");
const models_1 = require("../models");
const getUser = async (event, context) => {
    const userId = event.pathParameters["userId"];
    const services = context["services"];
    const user = await services.userService.getUser(userId);
    return {
        statusCode: 200,
        body: JSON.stringify(user),
    };
};
const createUser = async (event, context) => {
    const services = context["services"];
    await services.userService.createUser();
    return {
        statusCode: 201,
        body: "",
    };
};
const patchUser = async (event) => {
    const { userId } = event.pathParameters["userId"];
    const request = event.body;
    const db = new database_1.Database();
    const userDao = new models_1.UserDao(db);
    const user = await userDao.patchUser(userId, request);
};
const wrappedGetUser = (0, middy_1.default)(getUser)
    .use((0, middlewares_1.httpHeaderNormalizer)())
    .use((0, middlewares_1.doNotWaitForEmptyEventLoop)())
    .use((0, middlewares_1.jsonBodyParser)())
    .use((0, middlewares_2.initMiddleware)());
exports.getUser = wrappedGetUser;
const wrappedCreateUser = (0, middy_1.default)(createUser)
    .use((0, middlewares_1.httpHeaderNormalizer)())
    .use((0, middlewares_1.doNotWaitForEmptyEventLoop)())
    .use((0, middlewares_1.jsonBodyParser)())
    .use((0, middlewares_2.initMiddleware)());
exports.createUser = wrappedCreateUser;
