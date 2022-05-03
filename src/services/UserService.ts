import jwt from "jsonwebtoken";
import axios from "axios";
import bcrypt from "bcrypt";
import { UserDao } from "../models";

interface signInInput {
    email: string;
    password: string;
}

interface createUserInput {
    name: string;
    email: string;
    password: string;
    profileUrl?: string;
}

interface patchUserInput {
    name?: string;
    password?: string;
}

export class UserService {
    userDao: UserDao;

    constructor(userDao: UserDao) {
        this.userDao = userDao;
    }
    async signUp(data: createUserInput) {
        const hashedPassword = await this.generateHashedPassword(data.password);
        const userInfo = Object.assign(data, { password: hashedPassword });

        const userExist = await this.userDao.getUserByEmail(data.email);

        if (userExist) throw new Error("EMAIL ADDRESS EXISTS");

        return this.userDao.createUser(userInfo);
    }
    async signIn(data: signInInput) {
        const { email, password } = data;

        const user = await this.userDao.getUserByEmail(email);
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) throw new Error("INVALID PASSWORD");

        return this.generateToken(user.id);
    }
    async signInWithGoogle(token: string) {
        try {
            const { data } = await axios.post(
                `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
            );
            const userExist = await this.userDao.getUserByEmail(data.email);

            if (userExist) throw new Error("EMAIL ADDRESS EXISTS");

            const user = await this.userDao.createUser({
                name: data.name,
                email: data.email,
                profileUrl: data.picture
            });

            return this.generateToken(user.id);
        } catch (err) {
            throw new Error("INVALID_TOKEN");
        }
    }
    getUserInfo(userId: number) {
        return this.userDao.getUserInfo(userId);
    }
    getUserList(userId: number) {
        return this.userDao.getUserList(userId);
    }
    getUserParticipate(userId: number) {
        return this.userDao.getUserParticipate(userId);
    }
    getUserReceivedMessage(userId: number) {
        return this.userDao.getUserReceivedMessage(userId);
    }
    async patchUser(userId: number, data: patchUserInput) {
        if (data.password) {
            const hashedPassword = await this.generateHashedPassword(
                data.password
            );
            data.password = hashedPassword;
        }

        return this.userDao.patchUser(userId, data);
    }
    generateToken(userId: number) {
        return jwt.sign({ userId }, process.env.AUTH_TOKEN_SALT, {
            expiresIn: "7d"
        });
    }
    async generateHashedPassword(password: string) {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        return hashedPassword;
    }
}
