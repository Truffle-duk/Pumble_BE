import {response} from "../../config/response.js";
import {status} from "../../config/responseStatus.js";
import {BaseError} from "../../config/error.js";
import {
    deleteUser, getMyGroupService,
    retrieveUserNicknameAndEmail,
    updateUserNicknameService
} from "./user.service.js";

export const updateUserNickname = async (req, res, next) => {
    res.send(response(status.SUCCESS, await updateUserNicknameService(req.userId, req.body.nickname)))
}

export const getUserNicknameAndEmail = async (req, res, next) => {
    res.send(response(status.SUCCESS, await retrieveUserNicknameAndEmail(req.userId)));
}

export const drawout = async (req, res, next) => {
    res.send(response(status.SUCCESS, await deleteUser(req.userId)));
}

export const getMyGroup = async (req, res, next) => {
    const groupList = await getMyGroupService(req.userId)
    console.log(groupList)

    const {ownGroup, joinedGroup} = groupList.reduce(
        (acc, num) => {
            if (num.role === 'leader') {
                acc.ownGroup.push(num)
            } else {
                acc.joinedGroup.push(num)
            }
            return acc
        }, { ownGroup: [], joinedGroup: [] }
    )

    const responseDTO = {
        myGroup: ownGroup,
        connectedGroup: joinedGroup
    }

    res.send(response(status.SUCCESS, responseDTO));
}