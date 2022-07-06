"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFreshUserTokens = exports.comparePassword = exports.hashPassword = exports.Response = exports.ResponseUtils = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class ResponseUtils {
    static getSuccessResponse(data, message) {
        const r = {
            status: 'success',
            message: message,
            data: data,
        };
        return r;
    }
    static getErrorResponse(message, data) {
        const r = {
            status: 'failed',
            message,
            data,
        };
        return r;
    }
}
exports.ResponseUtils = ResponseUtils;
class Response {
}
exports.Response = Response;
const hashPassword = (password) => {
    return (0, bcryptjs_1.hashSync)(password, 10);
};
exports.hashPassword = hashPassword;
const comparePassword = (password, hashedPassword) => {
    return (0, bcryptjs_1.compareSync)(password, hashedPassword);
};
exports.comparePassword = comparePassword;
const createToken = (payload, duration) => {
    return (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET, { expiresIn: duration });
};
const generateFreshUserTokens = async (user) => {
    const tokenExpiryInSeconds = parseInt(process.env.JWT_TOKEN_EXPIRY_IN_SECONDS, 10);
    const tokenExpiresAt = new Date(new Date().getTime() + 1000 * tokenExpiryInSeconds);
    const accessToken = createToken(Object.assign(Object.assign({}, user), { tokenExpiresAt }), tokenExpiryInSeconds);
    return { accessToken };
};
exports.generateFreshUserTokens = generateFreshUserTokens;
//# sourceMappingURL=utils.js.map