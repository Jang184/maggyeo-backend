import crypto from "crypto";

export const getRandomKey = () => {
    const randomKey = crypto.randomBytes(20).toString("hex");
    return randomKey;
};
