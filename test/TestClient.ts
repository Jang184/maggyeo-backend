import { Database } from "../src/config/database";
import { User } from "../src/entities";
import { getServices } from "../src";
import { Connection, getConnection } from "typeorm";

export default class TestClient {
    connection: Connection;
    constructor(connection: Connection) {
        const initMiddleware = this.startMiddleware(connection);
        this.connection = connection;
    }

    async startMiddleware(connection: Connection) {
        const db = new Database(connection);
        const services = getServices(db);

        return services;
    }

    async startTransaction(actions) {
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            for (let action of actions) {
                await queryRunner.query(action);
            }

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }

    async truncate(tables) {
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            await queryRunner.query("SET FOREIGN_KEY_CHECKS=0");

            for (let table of tables) {
                await queryRunner.query(`TRUNCATE table ${table}`);
            }

            await queryRunner.query("SET FOREIGN_KEY_CHECKS=1");
            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

    closeConnection() {
        this.connection.close();
    }
}

export const getTestClient = () => {
    const connection = getConnection();
    const testClient = new TestClient(connection);

    return testClient;
};
