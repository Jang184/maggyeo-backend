import { Connection, getConnection } from "typeorm";
import { User } from "../src/entities";

export default class TestEntityGenerator {
    connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    async createUser() {
        const user = [
            {
                id: 1,
                name: "Juri",
                email: "juri@gmail.com",
                profileUrl: "test_url"
            },
            {
                id: 2,
                name: "Jun",
                email: "jun@gmail.com",
                profileUrl: "test2_url"
            }
        ];
        return () => {
            this.connection.manager.insert(User, user);
        };
    }
}

export const getTestEntityGenerator = () => {
    const connection = getConnection();
    const testEntityGenerator = new TestEntityGenerator(connection);

    return testEntityGenerator;
};
