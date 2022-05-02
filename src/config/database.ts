import {
    Connection,
    ConnectionOptions,
    ConnectionManager,
    createConnection,
    getConnectionManager,
    QueryRunner,
    EntityManager
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
        namingStrategy: new SnakeNamingStrategy()
    };

    return connectionOption;
};

export const getConnection = async () => {
    let connection: Connection;
    const connectionManager: ConnectionManager = getConnectionManager();

    if (connectionManager.has("default")) {
        connection = connectionManager.get("default");
        console.log("connection already exist");
    }
    if (!connection) {
        const connectionOptions = setEnvOptions();
        connection = await createConnection(connectionOptions);
        console.log("create new connection");
    }
    return connection;
};

export class Database {
    constructor(private connection: Connection) {
        this.connection = connection;
    }

    public async getConnection() {
        return this.connection;
    }

    public async query(action) {
        return await action(this.connection);
    }

    public async withTransaction(action) {
        const queryRunner: QueryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const result = await action(queryRunner);
            await queryRunner.commitTransaction();
            console.log("commit");

            return result;
        } catch (err) {
            await queryRunner.rollbackTransaction();
            console.log("roll back");
            throw err;
        } finally {
            await queryRunner.release();
        }
    }
}
