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

const createPresentList = async (event: APIGatewayEvent, context: Context) => {
    const services = context["service"];

    const presentList: PresentList =
        await services.presentService.createPresentList(event.body);

    return {
        statusCode: 201,
        body: ""
    };
};

const patchPresentList = async (event: APIGatewayEvent, context: Context) => {
    const listId = event.pathParameters["listId"];
    const services = context["service"];

    const presentList: PresentList =
        await services.presentService.patchPresentList(listId, event.body);

    return {
        statusCode: 200,
        body: ""
    };
};

const deletePresentList = async (event: APIGatewayEvent, context: Context) => {
    const listId = event.pathParameters["listId"];
    const services = context["service"];

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
