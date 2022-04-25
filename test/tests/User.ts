import { getTestClient } from "../TestClient";
import { getTestEntityGenerator } from "../TestEntityGenerator";

export default () => {
    describe("user test", () => {
        let testClient, testEntityGenerator;

        beforeAll(async () => {
            testClient = getTestClient();
            testEntityGenerator = getTestEntityGenerator();
        });

        describe("🍏 get user information", () => {
            beforeEach(async () => {
                await testClient.truncate(["USER"]);

                const createUser = testEntityGenerator.createUser();
                await testClient.startTransaction(createUser);
            });
            afterAll(async () => {
                await testClient.truncate(["USER"]);
            });
            test("SUCCESS: get user information with user id 1", async () => {
                //given, when, then
            });
        });
    });
};
