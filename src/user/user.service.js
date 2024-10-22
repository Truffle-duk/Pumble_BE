import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {retrieveUserById, retrieveUserNameById, updateUserName, updateUserStateToDeactivate} from "./user.model.js";
import {redisClient} from "../../config/redisConfig.js";

export const updateUserNicknameService = async (userId, name) => {
    const params = [name, userId]
    const updateResult = await updateUserName(params)

    if (updateResult.changedRows !== 1) {
        throw new BaseError(status.INTERNAL_SERVER_ERROR)
    }

    const updatedUser = await retrieveUserNameById(userId)

    return {newNickname: updatedUser.name, updatedAt: updatedUser.updated_at}
}

export const retrieveUserNicknameAndEmail = async (userId) => {
    const user = await retrieveUserById(userId)
    if (!user) {
        throw new BaseError(status.USER_NOT_EXIST)
    }

    return {nickname: user.name, email: user.email}
}

export const deleteUser = async (userId) => {
    //1. RTK 삭제
    await redisClient.del(`${userId}`)

    //2. 유저 비활성화 처리, 탈퇴 요청일 업데이트
    const updateResult = await updateUserStateToDeactivate(userId)

    if (updateResult.changedRows !== 1) {
        throw new BaseError(status.INTERNAL_SERVER_ERROR)
    }

    const updatedUser = await retrieveUserById(userId)

    return {status: updatedUser.status, updatedAt: updatedUser.updated_at}
}