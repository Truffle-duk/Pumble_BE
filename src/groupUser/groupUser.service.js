import {changeGroupUserProfile, findImageUrlById, withdrawGroupUser} from "./groupUser.model.js";
import {status} from "../../config/responseStatus.js";
import {BaseError} from "../../config/error.js";
import {imageDeleter} from "../middleware/s3Manager.js";

export const withdrawGroupService = async (gUserId) => {
    const withdrawGroupResult = await withdrawGroupUser(gUserId)

    if (withdrawGroupResult.affectedRows === 1) {
        return {withdrawAt: new Date()}
    } else {
        throw new BaseError(status.DB_ERROR)
    }
}

export const changeProfileImageService = async (gUserId, imageUrl) => {
    // 1. 기존 url 조회
    const existImageUrl = await findImageUrlById(gUserId)
    if (existImageUrl) {
        const key = existImageUrl.split('.com/')[1]
        await imageDeleter(key)
            .then( _ => {
                console.log("GroupUser Profile Image Delete Success")
            })
            .catch(err => {
                console.log("Error occurred at delete groupUser profile image: " + err)
            })
    }

    // url 변경
    const changeProfileImageResult = await changeGroupUserProfile('image', gUserId, imageUrl)
    if (changeProfileImageResult.affectedRows === 1) {
        return {updatedAt: new Date()}
    } else {
        throw new BaseError(status.DB_ERROR)
    }
}

export const changeProfileNicknameService = async (gUserId, newName) => {
    const changeProfileNickname = await changeGroupUserProfile('nickname', gUserId, newName)

    if (changeProfileNickname.affectedRows === 1) {
        return {updatedAt: new Date()}
    } else {
        throw new BaseError(status.DB_ERROR)
    }
}