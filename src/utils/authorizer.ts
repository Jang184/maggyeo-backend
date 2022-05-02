import jwt from "jsonwebtoken";

export const authorizer = async (event, context) => {
    const { awsRequestId } = context;
    const { authorizationToken, methodArn } = event;

    const user = validateToken(authorizationToken);

    return user
        ? generateAllow(awsRequestId, methodArn)
        : generateDeny(awsRequestId, methodArn);
};

const validateToken = (token) => jwt.verify(token, process.env.AUTH_TOKEN_SALT);

const generateAllow = (principalId, resource) => {
    return generatePolicy(principalId, "Allow", resource);
};

const generateDeny = (principalId, resource) => {
    return generatePolicy(principalId, "Deny", resource);
};

const generatePolicy = (principalId, effect, resource) => {
    const authReseponse = { principalId };
    if (effect && resource) {
        const policyDocument = {};
        policyDocument["Version"] = "2012-10-17";
        policyDocument["Statement"] = [];

        const statement = {};
        statement["Action"] = "execute-api:Invoke";
        statement["Effect"] = effect;
        statement["Resource"] = resource;
        policyDocument["Statement"][0] = statement;
        authReseponse["policyDocument"] = policyDocument;
    }

    return authReseponse;
};
