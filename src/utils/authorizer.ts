import jwt from "jsonwebtoken";

const generatePolicy = (principalId, methodArn) => {
    const apiGatewayWildcard = methodArn.split("/", 2).join("/") + "/*";

    return {
        principalId,
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: "Allow",
                    Resource: apiGatewayWildcard
                }
            ]
        }
    };
};

export const handler = async (event, context) => {
    const token = event.authorizationToken;
    if (!token) throw "Unauthorized";

    try {
        const user = validateToken(token);
        const policy = generatePolicy(user.userId, event.methodArn);

        return {
            ...policy,
            context: user
        };
    } catch (err) {
        console.log(err);
        throw "Unauthorized";
    }
};

const validateToken = (token) => jwt.verify(token, process.env.AUTH_TOKEN_SALT);
