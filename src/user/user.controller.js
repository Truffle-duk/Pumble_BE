import {response} from "../../config/response.js";
import {status} from "../../config/responseStatus.js";
import {BaseError} from "../../config/error.js";
import {deleteUser, retrieveUserNickname, updateUserNicknameService} from "./user.service.js";

export const updateUserNickname = async (req, res, next) => {
    res.send(response(status.SUCCESS, await updateUserNicknameService(req.userId, req.body.nickname)))
}

export const getUserNickname = async (req, res, next) => {
    res.send(response(status.SUCCESS, await retrieveUserNickname(req.userId)));
}

export const drawout = async (req, res, next) => {
    res.send(response(status.SUCCESS, await deleteUser(req.userId)));
}