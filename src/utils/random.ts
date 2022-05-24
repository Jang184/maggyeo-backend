import { S3 } from "aws-sdk";
import Axios from "axios";
import crypto from "crypto";

export const getObjectKey = (userId: number): string => {
    const randomKey = crypto.randomBytes(20).toString("hex");
    return `user/${userId}/${randomKey}.jpg`;
};

const urlToImage = async (url: string, userId: number) => {
    const s3 = new S3();
    const response = await Axios({
        url,
        method: "GET",
        responseType: "arraybuffer"
    });
    const objectKey = getObjectKey(userId);
    const contentType = response.headers["content-type"];

    const s3PutRequest = {
        Bucket: process.env.USER_BUCKET,
        Key: objectKey,
        Body: response.data,
        contentType: contentType
    };

    await s3
        .upload(s3PutRequest, (err) => {
            if (err) console.log(err);
        })
        .promise();
};
