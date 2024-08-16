import customJWT from "./jwtModules.js";
import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import dotenv from "dotenv";
dotenv.config()

const authChecker = async (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split('Bearer ')[1];
        if (!token) //토큰 없음
            throw new BaseError(status.TOKEN_NOT_EXIST)

        const payload = await customJWT.accessVerify(token);
        if (payload.valid === false) { //토큰 유효 X
            if (payload.message === 'jwt expired') {
                console.log('jwtMiddleware - expired token');
                throw new BaseError(status.EXPIRED_TOKEN)

            } else if (payload.message === 'invalid token') {
                console.log('jwtMiddleware - invalid token');
                throw new BaseError(status.INVALID_TOKEN)

            } else {
                console.log('jwtMiddleware - token err');
                throw new BaseError(status.INVALID_TOKEN)
            }

        } else {
            if (payload.id === undefined) {
                console.log('jwtMiddleware - id undefined');
                throw new BaseError(status.INVALID_TOKEN)
            }
        }

        req.user_id = payload.id;
        next();
    } else {
        console.log('jwtMiddleware - header.Authorization not exist');
        throw new BaseError(status.AUTHORIZATION_NOT_EXIST)
    }
}

export default authChecker