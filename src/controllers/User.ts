import middy from "middy";
import {
    doNotWaitForEmptyEventLoop,
    httpHeaderNormalizer,
    jsonBodyParser,
} from "middy/middlewares";
import { initMiddleware } from "../utils/middlewares";

import { Database } from "../config/database";
import { User } from "../entities";
import { UserDao } from "../models";

const getUser = async (event, context) => {
    const userId = event.pathParameters["userId"];
    const services = context["services"];

    const user: User = await services.userService.getUser(userId);

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
    const db = new Database();

    const userDao = new UserDao(db);
    const user = await userDao.patchUser(userId, request);
};
const wrappedGetUser = middy(getUser)
    .use(httpHeaderNormalizer())
    .use(doNotWaitForEmptyEventLoop())
    .use(jsonBodyParser())
    .use(initMiddleware());

const wrappedCreateUser = middy(createUser)
    .use(httpHeaderNormalizer())
    .use(doNotWaitForEmptyEventLoop())
    .use(jsonBodyParser())
    .use(initMiddleware());

export { wrappedGetUser as getUser, wrappedCreateUser as createUser };