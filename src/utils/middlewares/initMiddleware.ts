import { getServices } from "../../index"
import { Database } from "../../config/database";
import { HandlerLambda } from "middy";

const initMiddleware = () => {
    const db = new Database();
    
    return {
        before: async(handler: HandlerLambda) => {

            const services = getServices(db);
            handler.context["services"] = services;
            return;
        }
    }
}

export default initMiddleware;