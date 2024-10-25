import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {
    addAttendee,
    addEvent,
    checkAttendeeExist,
    retrieveAllEvents,
    retrieveMonthlyEvents,
    retrieveRecentlyEndedAndUpcoming,
    retrieveTargetEvent,
    retrieveTokenNum,
    updateUserToken
} from "./event.model.js";
import {eventResponseDTO, lastAndNextResponseDTO, monthlyEventResponseDTO} from "./event.dto.js";
import dotenv from "dotenv";

dotenv.config()

export const createEvent = async (groupId, body) => {
    const params = [
        body.title,
        body.description,
        body.startDate,
        body.endDate,
        body.place,
        body.maxPeople,
        body.reward,
        body.code,
        groupId
    ]

    const insertNewEventResult = await addEvent(params)

    return {eventId: insertNewEventResult}
}

export const joinEvent = async (gUserId, eventId, body) => {
    //비교할 이벤트 가져오기
    const targetEvent = await retrieveTargetEvent(eventId)

    //중복 참여 확인
    const checkDuplicate = await checkAttendeeExist(eventId, gUserId)
    if (checkDuplicate === 1) {
        throw new BaseError(status.ALREADY_ATTEND)
    }

    //유효성 검사(선착순, 코드 일치 확인)
    if (targetEvent.max_person === targetEvent.current_person) {
        throw new BaseError(status.EVENT_JOIN_UNABLE)
    } else if (targetEvent.code !== body.code) {
        throw new BaseError(status.WRONG_CODE)
    }

    //참여 신청
    const insertNewAttendee = await addAttendee(eventId, gUserId)
    if (insertNewAttendee && insertNewAttendee.affectedRows === 1) {
        const updateTokenResult = await checkAttendService(eventId, gUserId)
        if (updateTokenResult.updatedAt) {
            return {attendeeId: insertNewAttendee.insertId}
        } else {
            throw new BaseError(status.INTERNAL_SERVER_ERROR)
        }
    } else {
        throw new BaseError(status.INTERNAL_SERVER_ERROR)
    }
}

export const getAllEvents = async (groupId) => {
    const getAllEventsResult = await retrieveAllEvents(groupId)

    return eventResponseDTO(getAllEventsResult)
}

export const getMonthlyEvents = async (groupId, gUserId) => {
    const month = new Date().getMonth()+1
    const getMonthlyEventsResult = await retrieveMonthlyEvents(groupId, gUserId, month)

    return monthlyEventResponseDTO(getMonthlyEventsResult)
}

export const getRecentlyEndAndUpcoming = async (groupId) => {
    const getRecentlyEndedEvent = await retrieveRecentlyEndedAndUpcoming(groupId)

    return lastAndNextResponseDTO(getRecentlyEndedEvent)
}

const checkAttendService = async (eventId, gUserId) => {
    // 1. 지급할 토큰 조회
    const attendEvent = await retrieveTargetEvent(eventId)
    const reward = attendEvent.num_of_token

    // 2. 유저 보유 토큰 조회
    const usersToken = await retrieveTokenNum(gUserId)

    // 3. 보유 토큰 갱신
    const updateTokenResult = await updateUserToken(usersToken + reward, gUserId)

    if (updateTokenResult && updateTokenResult.affectedRows === 1) {
        return {updatedAt: new Date()}
    } else {
        throw new BaseError(status.INTERNAL_SERVER_ERROR)
    }
}

export const getEventByIdService = async (eventId) => {
    const targetEvent = await retrieveTargetEvent(eventId)

    if (targetEvent) {
        return {title: targetEvent.title}
    } else {
        throw new BaseError(status.INTERNAL_SERVER_ERROR)
    }
}