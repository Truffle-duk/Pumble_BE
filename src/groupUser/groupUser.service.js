import {
    changeGroupUserProfile,
    changeGroupUserRole, deleteGroupModel,
    findAllGroupUser, findGroupPasswordById,
    findImageUrlById, findNicknameAndImage, updateGroupPasswordModel,
    withdrawGroupUser
} from "./groupUser.model.js";
import {status} from "../../config/responseStatus.js";
import {BaseError} from "../../config/error.js";
import {imageDeleter} from "../middleware/s3Manager.js";
import crypto from "crypto";

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

export const getProfileService = async (gUserId) => {
    const getProfileResult = await findNicknameAndImage(gUserId)

    if (getProfileResult) {
        return getProfileResult
    } else {
        throw new BaseError(status.DB_ERROR)
    }
}

export const driveOutService = async (gUserId) => {
    const driveOutServiceResult = await changeGroupUserRole('driveOut', gUserId)

    if (driveOutServiceResult && driveOutServiceResult.affectedRows === 1) {
        return {updatedAt: new Date()}
    } else {
        throw new BaseError(status.DB_ERROR)
    }
}

export const appointService = async (gUserId) => {
    const appointServiceResult = await changeGroupUserRole('appoint', gUserId)

    if (appointServiceResult && appointServiceResult.affectedRows === 1) {
        return {updatedAt: new Date()}
    } else {
        throw new BaseError(status.DB_ERROR)
    }
}

export const demotionService = async (gUserId) => {
    const demotionServiceResult = await changeGroupUserRole('demotion', gUserId)

    if (demotionServiceResult && demotionServiceResult.affectedRows === 1) {
        return {updatedAt: new Date()}
    } else {
        throw new BaseError(status.DB_ERROR)
    }
}

export const entrustService = async (leaderId, memberId) => {
    const entrustServiceResult = await changeGroupUserRole('entrust', memberId)

    if (entrustServiceResult && entrustServiceResult.affectedRows === 1) {
        const changeLeaderToStaffResult = await changeGroupUserRole('appoint', leaderId)

        if (changeLeaderToStaffResult && changeLeaderToStaffResult.affectedRows === 1) {
            return {updatedAt: new Date()}
        } else {
            throw new BaseError(status.DB_ERROR)
        }

    } else {
        throw new BaseError(status.DB_ERROR)
    }
}

export const retrieveAllGroupUserService = async (groupId) => {
    return await findAllGroupUser(groupId)
}

export const deleteGroupService = async (groupId, body) => {
    const realPassword = await findGroupPasswordById(groupId)
    const inputPassword = crypto.createHash("sha512").update(body.password).digest("base64")
    if (inputPassword !== realPassword) {
        throw new BaseError(status.WRONG_PASSWORD)
    }

    const deleteGroupResult = await deleteGroupModel(groupId)
    if (deleteGroupResult && deleteGroupResult.affectedRows === 1) {
        return {deletedAt: new Date()}
    } else {
        throw new BaseError(status.DB_ERROR)
    }
}

export const retrieveGroupPassword = async (groupId, body) => {
    const realPassword = await findGroupPasswordById(groupId)
    const inputPassword = crypto.createHash("sha512").update(body.password).digest("base64")
    if (inputPassword !== realPassword) {
        throw new BaseError(status.WRONG_PASSWORD)
    } else {
        return "same!"
    }
}

export const changeGroupPasswordService = async (groupId, body) => {
    const newPassword = crypto.createHash("sha512").update(body.newPassword).digest("base64")
    const changePasswordResult = await updateGroupPasswordModel(groupId, newPassword)

    if (changePasswordResult && changePasswordResult.affectedRows === 1) {
        return {updatedAt: new Date()}
    } else {
        throw new BaseError(status.DB_ERROR)
    }
}