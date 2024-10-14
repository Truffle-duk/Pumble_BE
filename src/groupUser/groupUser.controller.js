import {response} from "../../config/response.js";
import {status} from "../../config/responseStatus.js";
import {
    appointService, changeGroupPasswordService,
    changeProfileImageService,
    changeProfileNicknameService, deleteGroupService, demotionService,
    driveOutService, entrustService, retrieveAllGroupUserService, retrieveGroupPassword,
    withdrawGroupService
} from "./groupUser.service.js";
import {BaseError} from "../../config/error.js";

export const withdrawGroup = async (req, res, next) => {
    res.send(response(status.SUCCESS, await withdrawGroupService(req.groupUserId)))
}

export const changeProfileImage = async (req, res, next) => {
    res.send(response(status.SUCCESS, await changeProfileImageService(req.groupUserId, req.s3ObjectUrl)))
}

export const changeProfileNickname = async (req, res, next) => {
    res.send(response(status.SUCCESS, await changeProfileNicknameService(req.groupUserId, req.body.newNickname)))
}

export const retrieveAllGroupUser = async (req, res, next) => {
    if (req.groupUserRole !== 'leader') {
        throw new BaseError(status.NO_AUTHORITY)
    }

    const groupMemberList = await retrieveAllGroupUserService(req.groupId)
    const staffList = groupMemberList.filter(member => member.role === 'staff').map(member => {
        return {
            groupUserId: member.group_user_id,
            nickname: member.nickname,
            profileImg: member.profile_image
        }
    })
    const generalUserList = groupMemberList.filter(member => member.role === 'member').map(member => {
        return {
            groupUserId: member.group_user_id,
            nickname: member.nickname,
            profileImg: member.profile_image
        }
    })

    const responseDTO = {
        staff: staffList,
        generalUser: generalUserList
    }

    res.send(response(status.SUCCESS, responseDTO))
}

export const driveOut = async (req, res, next) => {
    if (req.groupUserRole !== 'leader') {
        throw new BaseError(status.NO_AUTHORITY)
    }
    res.send(response(status.SUCCESS, await driveOutService(req.body.groupUserId)))
}

export const appoint = async (req, res, next) => {
    if (req.groupUserRole !== 'leader') {
        throw new BaseError(status.NO_AUTHORITY)
    }
    res.send(response(status.SUCCESS, await appointService(req.body.groupUserId)))
}

export const demotion = async (req, res, next) => {
    if (req.groupUserRole !== 'leader') {
        throw new BaseError(status.NO_AUTHORITY)
    }
    res.send(response(status.SUCCESS, await demotionService(req.body.groupUserId)))
}

export const entrust = async (req, res, next) => {
    if (req.groupUserRole !== 'leader') {
        throw new BaseError(status.NO_AUTHORITY)
    }
    res.send(response(status.SUCCESS, await entrustService(req.groupUserId, req.body.groupUserId)))
}

export const deleteGroup = async (req, res, next) => {
    if (req.groupUserRole !== 'leader') {
        throw new BaseError(status.NO_AUTHORITY)
    }
    res.send(response(status.SUCCESS, await deleteGroupService(req.groupId, req.body)))
}

export const changeGroupPassword = async (req, res, next) => {
    if (req.groupUserRole !== 'leader') {
        throw new BaseError(status.NO_AUTHORITY)
    }
    res.send(response(status.SUCCESS, await changeGroupPasswordService(req.groupId, req.body)))
}

export const checkPassword = async (req, res, next) => {
    if (req.groupUserRole !== 'leader') {
        throw new BaseError(status.NO_AUTHORITY)
    }
    res.send(response(status.SUCCESS, await retrieveGroupPassword(req.groupId, req.body)))
}