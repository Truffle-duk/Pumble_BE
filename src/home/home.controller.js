import {response} from "../../config/response.js";
import {status} from "../../config/responseStatus.js";
import {createNewGroupService, joinGroupService, retrieveJoinedGroupsService} from "./home.service.js";

export const createGroup = async (req, res, next) => {
    res.send(response(status.SUCCESS, await createNewGroupService(req.userId, req.body)))
}

export const joinGroup = async (req, res, next) => {
    res.send(response(status.SUCCESS, await joinGroupService(req.username, req.userId, req.body)))
}

export const retrieveJoinedGroup = async (req, res, next) => {
    res.send(response(status.SUCCESS, await retrieveJoinedGroupsService(req.userId)))
}

export const retrieveSelectedGroupInfo = async (req, res, next) => {
    const responseDTO = {
        groupId: req.groupId,
        userId: req.userId,
        groupUserRole: req.groupUserRole
    }
    res.send(response(status.SUCCESS, responseDTO))
}