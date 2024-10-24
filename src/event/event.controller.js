import {response} from "../../config/response.js";
import {status} from "../../config/responseStatus.js";
import {
    createEvent,
    getAllEvents, getEventByIdService,
    getMonthlyEvents,
    getRecentlyEndAndUpcoming,
    joinEvent
} from "./event.service.js";
import {BaseError} from "../../config/error.js";

export const eventCreate = async (req, res, next) => {
    if (req.groupUserRole === 'member') {
        throw new BaseError(status.NO_AUTHORITY)
    }

    res.send(response(status.SUCCESS, await createEvent(req.groupId, req.body)))
}
export const eventJoin = async (req, res, next) => {
    res.send(response(status.SUCCESS, await joinEvent(req.groupUserId, req.params.eventId, req.body)))
}

export const searchAllEvents = async (req, res, next) => {
    res.send(response(status.SUCCESS, await getAllEvents(req.groupId)))
}

export const searchMonthlyEvents = async (req, res, next) => {
    res.send(response(status.SUCCESS, await getMonthlyEvents(req.groupId, req.groupUserId)))
}

export const recentlyEndAndUpcoming = async (req, res, next) => {
    res.send(response(status.SUCCESS, await getRecentlyEndAndUpcoming(req.groupId)))
}

export const getEventById = async (req, res, next) => {
    res.send(response(status.SUCCESS, await getEventByIdService(req.query.id)))
}