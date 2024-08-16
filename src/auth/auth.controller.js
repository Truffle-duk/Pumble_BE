import {response} from "../../config/response.js";
import {status} from "../../config/responseStatus.js";
import {redisClient} from "../../config/redisConfig.js"
import {
    checkEmailDuplicateService,
    sendVerificationCodeService, signUpService,
    verifyEmailService
} from "./auth.service.js";

export const checkEmailDuplicate = async (req, res, next) => {
    res.send(response(status.SUCCESS, await checkEmailDuplicateService(req.body)))
}
export const sendVerificationCode = async (req, res, next) => {
    res.send(response(status.SUCCESS, await sendVerificationCodeService(req.body)));
}
export const verifyEmail = async (req, res, next) => {
    res.send(response(status.SUCCESS, await verifyEmailService(req.body)));
}

export const signUp = async (req, res, next) => {
    res.send(response(status.SUCCESS, await signUpService(req.body)))
}

export const test = async (req, res, next) => {
    await redisClient.set("test", "tset")
    const value = await redisClient.get("test")
    res.send(response(status.SUCCESS, value))
}