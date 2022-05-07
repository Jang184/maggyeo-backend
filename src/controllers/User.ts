import middy from "middy";
import {
    doNotWaitForEmptyEventLoop,
    httpHeaderNormalizer,
    jsonBodyParser
} from "middy/middlewares";
import { initMiddleware } from "../utils/middlewares";
import { User } from "../entities";
import { APIGatewayEvent, Context } from "aws-lambda";

/**
 * @api {post}  /signin     Sign Up
 * @apiName SignUp
 * @apiGroup User
 *
 * @apiParam (Body) {String}    name        user's name
 * @apiParam (Body) {String}    email       user's email
 * @apiParam (Body) {String}    password    user's password
 * @apiParam (Body) {String}    profileUrl  user's profile image url
 * @apiParamExample {json}  SignUpRequest
 *      {
 *          "name" : "testUser",
 *          "email" : "testUser@gmail.com",
 *          "password" : "testUser",
 *          "profileUrl" : "testUser.com"
 *       }
 *
 * @apiSuccess (200 OK) {String}    message
 * @apiSuccessExample {json}   SignUpSuccess
 *      HTTP/1.1 200 OK
 *      {
 *          "message" : "signup success"
 *      }
 */
const signUp = async (event, context) => {
    const services = context["services"];

    await services.userService.signUp(event.body);

    return {
        statusCode: 201,
        body: JSON.stringify({
            message: "signup success"
        })
    };
};

/**
 * @api {post}  /login      Sign In
 * @apiName SignIn
 * @apiGroup User
 *
 * @apiParam (Body) {String}    email       user's email
 * @apiParam (Body) {String}    password    user's password
 * @apiParamExample {json}  SignInRequest
 *      {
 *          "email" : "testUser@gmail.com",
 *          "password" : "testUser"
 *       }
 *
 * @apiSuccess (200 OK) {String}    message
 * @apiSuccess (200 OK) {String}    token
 * @apiSuccessExample {json}    SignInSuccess
 *      HTTP/1.1 200 OK
 *      {
 *          "message" : "login success",
 *          "token"   : "authorizationToken"
 *      }
 */
const signIn = async (event: APIGatewayEvent, context: Context) => {
    const services = context["services"];

    const token = await services.userService.signIn(event.body);

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "login success",
            token
        })
    };
};

const signInWithGoogle = async (event, context) => {
    const services = context["services"];
    const authorization = event.headers.Authorization;

    if (!authorization) throw new Error("No_Token");

    const token = await services.userService.signInWithGoogle(authorization);

    return {
        statusCode: 200,
        body: JSON.stringify({
            message: "login successs",
            token
        })
    };
};

/**
 * @api {get}   /user  Get User
 * @apiName GetUserInfo
 * @apiGroup User
 *
 * @apiSuccess (200 OK) {Number}    id  unique id
 * @apiSuccess (200 OK) {String}    name  user's name
 * @apiSuccess (200 OK) {String}    email user's email
 * @apiSuccess (200 OK) {String}    profileUrl  user's url of profile image
 */
const getUserInfo = async (event: APIGatewayEvent, context: Context) => {
    const userId = event.requestContext.authorizer["userId"];
    const services = context["services"];

    const user: User = await services.userService.getUserInfo(userId);

    return {
        statusCode: 200,
        body: JSON.stringify(user)
    };
};
/**
 * @api {get}   /user/list  Get User's List
 * @apiName GetUserList
 * @apiGroup User
 *
 * @apiSuccess (200 OK) {Number}    id                  unique id of list
 * @apiSuccess (200 OK) {String}    name                name of list
 * @apiSuccess (200 OK) {String}    description         description of list
 * @apiSuccess (200 OK) {Date}      createdAt           created date
 * @apiSuccess (200 OK) {Date}      updatedAt           updated date
 * @apiSuccess (200 OK) {Object}    presentDetail               detail of list
 * @apiSuccess (200 OK) {Number}    presentDetail.id            unique id of detail
 * @apiSuccess (200 OK) {String}    presentDetail.url           url of detail
 * @apiSuccess (200 OK) {Number}    presentDetail.price         price of detail
 * @apiSuccess (200 OK) {String}    presentDetail.description   description of detail
 * @apiSuccess (200 OK) {Number}    presentDetail.countLimit    count limit
 * @apiSuccess (200 OK) {Number}    presentDetail.countNow      count now
 * @apiSuccess (200 OK) {Date}      presentDetail.createdAt     created date
 * @apiSuccess (200 OK) {Date}      presentDetail.updatedAt     updated date
 */
const getUserList = async (event: APIGatewayEvent, context: Context) => {
    const userId = event.requestContext.authorizer["userId"];
    const services = context["services"];

    const user: User = await services.userService.getUserList(userId);

    return {
        statusCode: 200,
        body: JSON.stringify(user)
    };
};

/**
 * @api {get}   /user/participate   Get User's participation
 * @apiName GetUserParticipate
 * @apiGroup User
 *
 * @apiSuccess  (200 OK)    {}
 */
const getUserParticipate = async (event: APIGatewayEvent, context: Context) => {
    const userId = event.requestContext.authorizer["userId"];
    const services = context["services"];

    const user: User = await services.userService.getUserParticipate(userId);

    return {
        statusCode: 200,
        body: JSON.stringify(user)
    };
};

/**
 * @api {get}   /user/message   Get Received Message
 * @apiName GetUserMessage
 * @apiGroup User
 *
 * @apiSuccess  (200 OK)    {Number}    id          id of message
 * @apiSuccess  (200 OK)    {String}    message     received message
 * @apiSuccess  (200 OK)    {Date}      createdAt   created date
 * @apiSuccess  (200 OK)    {Date}      updatedAt   updated date
 */
const getUserReceivedMessage = async (
    event: APIGatewayEvent,
    context: Context
) => {
    const userId = event.requestContext.authorizer["userId"];
    const services = context["services"];

    const user: User = await services.userService.getUserReceivedMessage(
        userId
    );

    return {
        statusCode: 200,
        body: JSON.stringify(user)
    };
};

/**
 * @api {patch} /user   Patch User
 * @apiName PatchUser
 * @apiGroup User
 *
 * @apiParam (Body) {String}    [name]      user's name
 * @apiParam (Body) {String}    [password]  user's password
 * @apiParamExample {json}  PatchUserRequest
 *      {
 *          "name" : "testUser2",
 *          "password" : "testUser2"
 *      }
 */

// TODO :: when client changes profile image, get presigned url of profile images
//         client want to upload.
const patchUser = async (event: APIGatewayEvent, context: Context) => {
    const userId = event.requestContext.authorizer["userId"];
    const services = context["services"];

    await services.userService.patchUser(userId, event.body);

    return {
        statusCode: 200,
        body: ""
    };
};

const wrappedSignUp = middy(signUp)
    .use(httpHeaderNormalizer())
    .use(doNotWaitForEmptyEventLoop())
    .use(jsonBodyParser())
    .use(initMiddleware());

const wrappedSignIn = middy(signIn)
    .use(httpHeaderNormalizer())
    .use(doNotWaitForEmptyEventLoop())
    .use(jsonBodyParser())
    .use(initMiddleware());

const wrappedGetUserInfo = middy(getUserInfo)
    .use(httpHeaderNormalizer())
    .use(doNotWaitForEmptyEventLoop())
    .use(jsonBodyParser())
    .use(initMiddleware());

const wrappedGetUserList = middy(getUserList)
    .use(httpHeaderNormalizer())
    .use(doNotWaitForEmptyEventLoop())
    .use(jsonBodyParser())
    .use(initMiddleware());

const wrappedGetUserParticipate = middy(getUserParticipate)
    .use(httpHeaderNormalizer())
    .use(doNotWaitForEmptyEventLoop())
    .use(jsonBodyParser())
    .use(initMiddleware());

const wrappedGetUserReceivedMessage = middy(getUserReceivedMessage)
    .use(httpHeaderNormalizer())
    .use(doNotWaitForEmptyEventLoop())
    .use(jsonBodyParser())
    .use(initMiddleware());

const wrappedPatchUser = middy(patchUser)
    .use(httpHeaderNormalizer())
    .use(doNotWaitForEmptyEventLoop())
    .use(jsonBodyParser())
    .use(initMiddleware());

export {
    wrappedSignUp as signUp,
    wrappedSignIn as signIn,
    wrappedGetUserInfo as getUserInfo,
    wrappedGetUserList as getUserList,
    wrappedGetUserParticipate as getUserParticipate,
    wrappedGetUserReceivedMessage as getUserReceivedMessage,
    wrappedPatchUser as patchUser
};
