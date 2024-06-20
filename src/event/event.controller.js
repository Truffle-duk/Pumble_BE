import {response} from "../../config/response.js";
import {status} from "../../config/responseStatus.js";
import {createEvent, getAllEvents, getMonthlyEvents, getRecentlyEndAndUpcoming, joinEvent} from "./event.service.js";

export const eventCreate = async (req, res, next) => {
    res.send(response(status.SUCCESS, await createEvent(req.body)))
}
export const eventJoin = async (req, res, next) => {
    const eventId = req.params.id
    res.send(response(status.SUCCESS, await joinEvent(eventId, req.body)))
}

export const searchAllEvents = async (req, res, next) => {
    const groupId = req.query.groupId
    res.send(response(status.SUCCESS, await getAllEvents(groupId)))
}

export const searchMonthlyEvents = async (req, res, next) => {
    res.send(response(status.SUCCESS, await getMonthlyEvents(req.query)))
}

export const recentlyEndAndUpcoming = async (req, res, next) => {
    res.send(response(status.SUCCESS, await getRecentlyEndAndUpcoming(req.query)))
}