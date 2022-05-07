import middy from "middy";
import {
    doNotWaitForEmptyEventLoop,
    httpHeaderNormalizer,
    jsonBodyParser
} from "middy/middlewares";
import { initMiddleware } from "../utils/middlewares";
import { PresentList } from "../entities";
import { APIGatewayEvent, Context } from "aws-lambda";

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

const getPresentLists = async (event: APIGatewayEvent, context: Context) => {
    const services = context["services"];

    const presentLists: PresentList =
        await services.presentService.getPresentLists();

    return {
        statuscode: 200,
        body: JSON.stringify(presentLists)
    };
};

/**
 * @api {post}  /list   Create Present List
 * @apiName CreatePresentList
 * @apiGroup    PresentList
 *
 * @apiParam    (Body)  {String}    name            name of present list
 * @apiParam    (Body)  {String}    description     description of present list
 * @apiParam    (Body)  {Object[]}  presentDetail   detail of present List
 * @apiParam    (Body)  {String}    presentDetail.url           url of present detail
 * @apiParam    (Body)  {String}    presentDetail.description   description of present detail
 * @apiParam    (Body)  {Number}    presentDetail.countLimit   count limit of present detail
 * @apiParam    (Body)  {Number}    presentDetail.price         price of present detail
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
 * @api {patch}  /list/{listId}   Patch Present List
 * @apiName PatchPresentList
 * @apiGroup    PresentList
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
    const services = context["services"];

    const presentList: PresentList =
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

export {
    wrappedGetPresentList as getPresentList,
    wrappedGetPresentLists as getPresentLists,
    wrappedCreatePresentList as createPresentList,
    wrappedPatchPresentList as patchPresentList,
    wrappedDeletePresentList as deletePresentList
};
