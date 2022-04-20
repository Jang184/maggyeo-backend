import {
    Connection,
    ConnectionOptions,
    ConnectionManager,
    createConnection,
    getConnectionManager,
    QueryRunner,
    EntityManager,
} from "typeorm";

import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import { User, PresentList, PresentDetail, Participate } from "../entities";
// import {

// } from "../subscribers";

const entities = [User, PresentList, PresentDetail, Participate];

const subscribers = [];

const setEnvOptions = () => {
    const { DB_HOST, DB_USER_NAME, DB_PASSWORD, DB_DATABASE } = process.env;

    const connectionOption: ConnectionOptions = {
        type: "mysql",
        host: DB_HOST,
        username: DB_USER_NAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        synchronize: true,
        entities: entities,
        // subscribers : subscribers,
        namingStrategy: new SnakeNamingStrategy(),
    };

    return connectionOption;
};

export class Database {
    public async getConnection() {
        let connection: Connection;
        const connectionManager: ConnectionManager = getConnectionManager();

        if (connectionManager.has("default")) {
            connection = connectionManager.get("default");
        }
        if (!connection) {
            const connectionOptions = setEnvOptions();
            connection = await createConnection(connectionOptions);
        }
        return connection;
    }

    public async withQuery(action) {
        const connection: Connection = await this.getConnection();
        const manager: EntityManager = connection.manager;

        const result = await action(manager);

        return result;
    }

    public async withTransaction(action) {
        const connection: Connection = await this.getConnection();
        const queryRunner: QueryRunner = connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const result = await action(queryRunner);
            await queryRunner.commitTransaction();

            return result;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
}
