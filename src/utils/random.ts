import { S3 } from "aws-sdk";
import Axios from "axios";
import crypto from "crypto";

export const getRandomString = (): string => {
    const randomString = crypto.randomBytes(20).toString("hex");
    return randomString;
};
