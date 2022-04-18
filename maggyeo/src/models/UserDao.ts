import {Repository} from "typeorm";

import {User} from "../entities";
import {Database} from "../config/database";

export default class UserDao {
    
    constructor(private db: Database){
        this.db = db;
    }

    async getManager(){
        const connection = await this.db.getConnection();
        
        return connection.manager
    }

    async getUser(userId: number){
        const manager = await this.getManager()
        const userRepository: Repository<User> = manager.getRepository(User);

        const result: User = await userRepository.findOne({
            id: userId
        });

        return result
    }

}