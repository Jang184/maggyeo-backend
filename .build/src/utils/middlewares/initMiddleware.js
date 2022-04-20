"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const database_1 = require("../../config/database");
const initMiddleware = () => {
    const db = new database_1.Database();
    return {
        before: async (handler) => {
            const services = (0, index_1.getServices)(db);
            handler.context["services"] = services;
            return;
        }
    };
};
exports.default = initMiddleware;
