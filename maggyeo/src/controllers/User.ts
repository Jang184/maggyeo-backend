import { Database } from "../config/database"
import { User } from "../entities";
import { UserDao } from "../models"

export const getUser = async (event) => {
    const {userId} = event.pathParameters["userId"];

    const db = new Database()
    const userDao = new UserDao(db)
    const user: User = await userDao.getUser(userId)

    if (user == null){
        throw new Error(`User id ${userId} does not exist.`);
    }
    
    return {
        statusCode: 200,
        body: JSON.stringify(user)
    }
}