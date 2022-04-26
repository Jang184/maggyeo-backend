import { getServices } from "../../index";
import { Database, getConnection } from "../../config/database";
import { HandlerLambda } from "middy";

const initMiddleware = () => {
    return {
        before: async (handler: HandlerLambda) => {
            const connection = await getConnection();
            const db = new Database(connection);
            const services = getServices(db);
            handler.context["services"] = services;
            return;
        },
    };
};

export default initMiddleware;
