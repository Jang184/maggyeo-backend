import middy from "middy";
import {
    doNotWaitForEmptyEventLoop,
    httpHeaderNormalizer,
    jsonBodyParser
} from "middy/middlewares";
import { initMiddleware } from "../utils/middlewares";
import { PresentList } from "../entities";
import { APIGatewayEvent, Context, ProxyResult } from "aws-lambda";

/**
 * @api {get}   /list/:listId  Get Present List
 * @apiName GetPresentList
 * @apiGroup Present
 *
 * @apiParam (PathParam) {Number} listId    List Id
 * @apiParamExample {text}  Request
 *      HTTP/1.1    GET  /list/814
 *
 * @apiSuccess  (200 OK)  {Number}    id            unique id
 * @apiSuccess  (200 OK)  {String}    name          name of list
 * @apiSuccess  (200 OK)  {String}    description   description of list
 * @apiSuccess  (200 OK)  {Date}      createdAt     created date
 * @apiSuccess  (200 OK)  {Date}      updatedAt     updated date
 * @apiSuccess  (200 OK)  {Number}    user          userId
 * @apiSuccess  (200 OK)  {Object[]}  presentDetail             Present Detail
 * @apiSuccess  (200 OK)  {Number}    presentDetail.id          id of detail
 * @apiSuccess  (200 OK)  {String}    presentDetail.url         url of detail
 * @apiSuccess  (200 OK)  {Number}    presentDetail.price       price of detail
 * @apiSuccess  (200 OK)  {String}    presentDetail.description description of detail
 * @apiSuccess  (200 OK)  {Number}    presentDetail.countLimit  count limit of detail
 * @apiSuccess  (200 OK)  {Number}    presentDetail.contNow     count now of detail
 * @apiSuccess  (200 OK)  {Date}      presentDetail.createdAt   created date
 * @apiSuccess  (200 OK)  {Date}      presentDetail.updatedAt   updated date
 *
 */
const getPresentList = async (event: APIGatewayEvent, context: Context) => {
    const listId = event.pathParameters["listId"];
    const services = context["services"];

    const presentList: PresentList =
        await services.presentService.getPresentList(listId);

    return {
        statuscode: 200,
        body: JSON.stringify(presentList)
    };
};

/**
 * @api {get}   /list   Get All Present List
 * @apiName GetAllPresentList
 * @apiGroup Present
 *
 * @apiParam  (QueryStringParam)    {Number}    [offset=0]
 * @apiParam  (QueryStringParam)    {Number}    [limit=10]
 * @apiParam  (QueryStringParam)    {String="DESC","ASC"}    [order]
 * @apiParamExample {text}
 *      HTTP/1.1   GET  /list?offset=0&limit=5&order=ASC
 *
 * @apiSuccess (200 OK) {Object[]}  something
 * @apiSuccess (200 OK) {Number}    id
 * @apiSuccess (200 OK) {String}    name
 * @apiSuccess (200 OK) {String}    description
 * @apiSuccess (200 OK) {Date}      createdAt
 * @apiSuccess (200 OK) {Date}      updatedAt
 */
const getPresentLists = async (event: APIGatewayEvent, context: Context) => {
    let {
        offset = 0,
        limit = 10,
        order = "DESC"
    } = event.queryStringParameters;
    const services = context["services"];

    const presentLists: PresentList =
        await services.presentService.getPresentLists(
            Number(offset),
            Number(limit),
            order
        );

    return {
        statusCode: 200,
        body: JSON.stringify(presentLists)
    };
};

const getPresentDetail = async (
    event: APIGatewayEvent,
    context: Context
): Promise<ProxyResult> => {
    const detailId = event.pathParameters["detailId"];
    const services = context["services"];

    const presentDetail = await services.presentService.getPresentDetail(
        detailId
    );

    return {
        statusCode: 200,
        body: JSON.stringify(presentDetail)
    };
};

/**
 * @api {post}  /list   Create Present List
 * @apiName CreatePresentList
 * @apiGroup    PresentList
 *
 * @apiHeader   {String}    Authorization   authorization value
 *
 * @apiBody     {String}    name            name of present list
 * @apiBody     {String}    description     description of present list
 * @apiBody     {Object[]}  presentDetail   detail of present List
 * @apiBody     {String}    presentDetail.url           url of present detail
 * @apiBody     {String}    presentDetail.description   description of present detail
 * @apiBody     {Number}    presentDetail.countLimit   count limit of present detail
 * @apiBody     {Number}    presentDetail.price         price of present detail
 *
 */
const createPresentList = async (event: APIGatewayEvent, context: Context) => {
    const userId = event.requestContext.authorizer["userId"];
    const services = context["services"];

    const presentList: PresentList =
        await services.presentService.createPresentList(userId, event.body);

    return {
        statusCode: 201,
        body: ""
    };
};

/**
 * @api {patch}  /list/:listId   Patch Present List
 * @apiName PatchPresentList
 * @apiGroup    PresentList
 *
 * @apiHeader   {String}    Authorization   authorization value
 *
 * @apiParam    (pathParam) {Number}    listId  list id
 * @apiParam    (Body)  {Object}    [presentList]       present list
 * @apiParam    (Body)  {String}    [presentList.name]  name of present list
 * @apiParam    (Body)  {String}    [presentList.description]     description of present list
 * @apiParam    (Body)  {Object[]}  [presentDetail]   detail of present list
 * @apiParam    (Body)  {String}    [presentDetail.url]           url of present detail
 * @apiParam    (Body)  {String}    [presentDetail.description]   description of present detail
 * @apiParam    (Body)  {Number}    [presentDetail.countLimit]   count limit of present detail
 * @apiParam    (Body)  {Number}    [presentDetail.price]         price of present detail
 */
const patchPresentList = async (event: APIGatewayEvent, context: Context) => {
    const listId = event.pathParameters["listId"];
    const userId = event.requestContext.authorizer["userId"];
    const services = context["services"];

    const presentList = await services.presentService.getPresentList(listId);

    if (presentList.userId !== userId)
        return { statusCode: 403, body: JSON.stringify("Forbidden") };

    await services.presentService.patchPresentList(listId, event.body);

    return {
        statusCode: 200,
        body: ""
    };
};

const deletePresentList = async (event: APIGatewayEvent, context: Context) => {
    const listId = event.pathParameters["listId"];
    const services = context["services"];

    await services.presentService.deletePresentList(listId);

    return {
        statusCode: 200,
        body: ""
    };
};

const wrappedGetPresentList = middy(getPresentList)
    .use(httpHeaderNormalizer())
    .use(doNotWaitForEmptyEventLoop())
    .use(jsonBodyParser())
    .use(initMiddleware());

const wrappedGetPresentLists = middy(getPresentLists)
    .use(httpHeaderNormalizer())
    .use(doNotWaitForEmptyEventLoop())
    .use(jsonBodyParser())
    .use(initMiddleware());

const wrappedCreatePresentList = middy(createPresentList)
    .use(httpHeaderNormalizer())
    .use(doNotWaitForEmptyEventLoop())
    .use(jsonBodyParser())
    .use(initMiddleware());

const wrappedPatchPresentList = middy(patchPresentList)
    .use(httpHeaderNormalizer())
    .use(doNotWaitForEmptyEventLoop())
    .use(jsonBodyParser())
    .use(initMiddleware());

const wrappedDeletePresentList = middy(deletePresentList)
    .use(httpHeaderNormalizer())
    .use(doNotWaitForEmptyEventLoop())
    .use(jsonBodyParser())
    .use(initMiddleware());

const wrappedGetPresentDetail = middy(getPresentDetail)
    .use(httpHeaderNormalizer())
    .use(doNotWaitForEmptyEventLoop())
    .use(jsonBodyParser())
    .use(initMiddleware());

export {
    wrappedGetPresentList as getPresentList,
    wrappedGetPresentLists as getPresentLists,
    wrappedCreatePresentList as createPresentList,
    wrappedPatchPresentList as patchPresentList,
    wrappedDeletePresentList as deletePresentList,
    wrappedGetPresentDetail as getPresentDetail
};
