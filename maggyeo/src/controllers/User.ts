import middy from "middy";
import {
    doNotWaitForEmptyEventLoop,
    httpHeaderNormalizer,
    jsonBodyParser
} from "middy/middlewares"

import { Database } from "../config/database"
import { User } from "../entities";
import { UserDao } from "../models"

const getUser = async (event) => {
    const {userId} = event.pathParameters["userId"];
    const db = new Database()

    const userDao = new UserDao(db);
    const user: User = await userDao.getUser(userId);

    return {
        statusCode: 200,
        body: JSON.stringify(user)
    }
}

const patchUser = async (event) => {
    const {userId} = event.pathParameters["userId"];
    const request = event.body;
    const db = new Database();

    const userDao = new UserDao(db);
    const user = await userDao.patchUser(userId, request)
}
const wrappedGetUser = middy(getUser)
    .use(httpHeaderNormalizer())
    .use(doNotWaitForEmptyEventLoop())
    .use(jsonBodyParser())

const wrappedPatchUser = middy(patchUser)
    .use(httpHeaderNormalizer())
    .use(doNotWaitForEmptyEventLoop())
    .use(jsonBodyParser())

export { 
    wrappedGetUser as getUser,
    wrappedPatchUser as patchUser
};