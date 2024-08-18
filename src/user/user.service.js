import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {retrieveUserById, retrieveUserNameById, updateUserName} from "./user.model.js";

export const updateUserNicknameService = async (userId, name) => {
    const params = [name, userId]
    const updateResult = await updateUserName(params)

    if (updateResult.changedRows !== 1) {
        throw new BaseError(status.INTERNAL_SERVER_ERROR)
    }

    const updatedUser = await retrieveUserNameById(userId)

    return {newNickname: updatedUser.name, updatedAt: updatedUser.updated_at}
}

export const retrieveUserNickname = async (userId) => {
    const user = await retrieveUserById(userId)
    if (!user) {
        throw new BaseError(status.USER_NOT_EXIST)
    }

    return {nickname: user.name}
}