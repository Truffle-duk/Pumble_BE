import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {retrieveUserById, updateUserName} from "./user.model.js";

export const updateUserNicknameService = async (userId, name) => {
    const params = [name, userId]
    const updateResult = await updateUserName(params)

    if (updateResult.changedRows !== 1) {
        throw new BaseError(status.INTERNAL_SERVER_ERROR)
    }

    const updatedUser = await retrieveUserById(userId)

    return {newNickname: updatedUser.name, updatedAt: updatedUser.updated_at}
}