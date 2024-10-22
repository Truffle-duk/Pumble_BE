import {response} from "../../config/response.js";
import {status} from "../../config/responseStatus.js";
import {
    changeProfileImageService,
    changeProfileNicknameService,
    getProfileService,
    withdrawGroupService
} from "./groupUser.service.js";

export const withdrawGroup = async (req, res, next) => {
    res.send(response(status.SUCCESS, await withdrawGroupService(req.groupUserId)))
}

export const changeProfileImage = async (req, res, next) => {
    res.send(response(status.SUCCESS, await changeProfileImageService(req.groupUserId, req.s3ObjectUrl)))
}

export const changeProfileNickname = async (req, res, next) => {
    res.send(response(status.SUCCESS, await changeProfileNicknameService(req.groupUserId, req.body.newNickname)))
}

export const getProfile = async (req, res, next) => {
    res.send(response(status.SUCCESS, await getProfileService(req.groupUserId)))
}