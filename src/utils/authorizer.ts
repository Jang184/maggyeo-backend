import jwt from "jsonwebtoken"

export const authorizer = async (event) => {
    const authorization = event.headers.Authorization as string;

    if (!authorization) return;

    const user = jwt.verify(authorization, process.env.AUTH_TOKEN_SALT);

    return user;
}

