import dotenv from "dotenv";
import jwt from "jsonwebtoken"
import {redisClient} from "../../config/redisConfig.js"
dotenv.config();
const secret = process.env.JWT_SECRET;

module.exports = {
    accessSign: async (user) => { //accessToken 발급
        const payload = {
            id: user.id,
            nickname: user.nickname,
            email: user.email,
            provider: user.provider
        };
        return jwt.sign(payload, secret, {algorithm: 'HS256', expiresIn: '7d'});
    },

    accessVerify: async (token) => {
        let decode = null;
        try {
            decode = jwt.verify(token, secret);
            return {
                valid: true,
                id: decode.id,
                nickname: decode.nickname,
                email: decode.email,
                provider: decode.provider
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
        return jwt.sign({}, secret, {algorithm: 'HS256', expiresIn: '30d'});
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
                        expiredIn: decode.exp //남은 시간
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