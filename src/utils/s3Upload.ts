import { S3 } from "aws-sdk";
import { PutObjectRequest } from "aws-sdk/clients/s3";
import Axios from "axios";
import { getRandomString } from "./random";

type S3PresginedURLRequest = {
    readonly Bucket: string;
    readonly Key: string;
    readonly Expires: number;
    readonly ContentType: string;
    readonly ACL: string;
};

interface S3Upload {
    generateObjectKey(): string;
    getS3Path(bucket: string, objectKey: string): string;
    upload(param: PutObjectRequest): Promise<void>;
    getPresignedURL(bucket: string): Promise<string>;
}

export class S3UploadImple implements S3Upload {
    private s3 = new S3();
    constructor(private userId: number) {}

    generateObjectKey() {
        const randomKey = getRandomString();
        const objectKey = `user/${this.userId}/${randomKey}.jpg`;
        return objectKey;
    }
    getS3Path(bucket: string, objectKey: string): string {
        return `https://${bucket}.s3.ap-northeast-2.amazonaws.com/${objectKey}`;
    }
    async upload(param: PutObjectRequest): Promise<void> {
        await this.s3
            .upload(param, (err) => {
                if (err) {
                    console.log(err);
                    throw new Error("upload failed");
                }
            })
            .promise();
    }
    async URLToImage(bucket: string, url: string) {
        const response = await Axios({
            url,
            method: "GET",
            responseType: "arraybuffer"
        });
        const objectKey = this.generateObjectKey();
        const contentType = response.headers["content-type"];

        const s3PutRequest: PutObjectRequest = {
            Bucket: bucket,
            Key: objectKey,
            Body: response.data,
            ContentType: contentType
        };
        await this.upload(s3PutRequest);
        const URL = this.getS3Path(bucket, objectKey);
        return URL;
    }
    async getPresignedURL(bucket: string): Promise<string> {
        const objectKey = this.generateObjectKey();
        const URL_EXPIRATION_SECONDS = 300;

        const s3PutRequest: S3PresginedURLRequest = {
            Bucket: bucket,
            Key: objectKey,
            Expires: URL_EXPIRATION_SECONDS,
            ContentType: "image/jpeg",
            ACL: "public-read"
        };

        const URL = await this.s3.getSignedUrlPromise(
            "putObject",
            s3PutRequest
        );
        return URL;
    }
}
