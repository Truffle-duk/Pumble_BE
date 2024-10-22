import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import {redisClient} from "../../config/redisConfig.js"
dotenv.config();
const secret = process.env.JWT_SECRET;

const customJWT = {
    accessSign: async (user) => { //accessToken 발급
        const payload = {
            id: user.user_id,
            name: user.name
        };
        return jwt.sign(payload, secret, {algorithm: 'HS256', expiresIn: '3h'});
    },

    accessVerify: async (token) => {
        let decode = null;
        try {
            decode = jwt.verify(token, secret);
            return {
                valid: true,
                id: decode.id,
                name: decode.name
            }
        } catch (err) {
            return {
                valid: false,
                name: err.name,
                message: err.message
            }
        }
    },

    refreshSign: async () => { //refreshToken 발급
        return jwt.sign({}, secret, {algorithm: 'HS256', issuer: 'truffle'});
    },

    refreshVerify: async (token, userId) => { //DB에 있는 값과 같은지 확인
        let dbRefresh = await redisClient.get(`${userId}`); //db에서 가져오는거
        let decode = null;
        try {
            if (dbRefresh === token) { //db 속 토큰과 같은지
                try {
                    decode = jwt.verify(token, secret);
                    return {
                        valid: true,
                        issuer: decode.iss
                    }
                } catch (err) {
                    return {
                        valid: false,
                        name: err.name,
                        message: err.message
                    }
                }
            } else {
                return {
                    valid: false,
                    message: 'wrong token'
                }
            }
        } catch (err) {
            return {
                valid: false,
                name: err.name,
                message: err.message
            }
        }
    }
}

export default customJWT