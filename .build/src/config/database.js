"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const typeorm_1 = require("typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const entities_1 = require("../entities");
// import {
// } from "../subscribers";
const entities = [entities_1.User, entities_1.PresentList, entities_1.PresentDetail, entities_1.Participate];
const subscribers = [];
const setEnvOptions = () => {
    const { DB_HOST, DB_USER_NAME, DB_PASSWORD, DB_DATABASE } = process.env;
    const connectionOption = {
        type: "mysql",
        host: DB_HOST,
        username: DB_USER_NAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        synchronize: true,
        entities: entities,
        // subscribers : subscribers,
        namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
    };
    return connectionOption;
};
class Database {
    async getConnection() {
        let connection;
        const connectionManager = (0, typeorm_1.getConnectionManager)();
        if (connectionManager.has("default")) {
            connection = connectionManager.get("default");
        }
        if (!connection) {
            const connectionOptions = setEnvOptions();
            connection = await (0, typeorm_1.createConnection)(connectionOptions);
        }
        return connection;
    }
    async withQuery(action) {
        const connection = await this.getConnection();
        const manager = connection.manager;
        const result = await action(manager);
        return result;
    }
    async withTransaction(action) {
        const connection = await this.getConnection();
        const queryRunner = connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const result = await action(queryRunner);
            await queryRunner.commitTransaction();
            return result;
        }
        catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        }
        finally {
            await queryRunner.release();
        }
    }
}
exports.Database = Database;
