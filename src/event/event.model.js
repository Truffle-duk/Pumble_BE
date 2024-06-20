import {pool} from "../../config/database.js";
import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {
    selectEventsAll,
    selectRecentlyEndAndUpcomingEvent,
    selectMonthlyEvents,
    insertEvent,
    insertAttendee,
    checkDuplicateAttendee,
    updateAttendeeNum,
    selectTargetEvent
} from "./event.sql.js";

export const addEvent = async (data) => {
    try{
        const conn = await pool.getConnection();

        const result = await pool.query(insertEvent, data);

        conn.release();

        return result[0].insertId;

    } catch (err) {
        throw new BaseError(status.DB_ERROR);
    }
}

export const retrieveTargetEvent = async (eventId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectTargetEvent, eventId);

        conn.release();

        return result[0]

    } catch (err) {
        throw new BaseError(status.DB_ERROR);
    }
}

export const addAttendee = async (eventId, groupUserId) => {
    try{
        const conn = await pool.getConnection();

        await pool.query(updateAttendeeNum, [eventId, groupUserId]) //현재 참여 인원 +1
        const result = await pool.query(insertAttendee, [eventId, groupUserId]);

        conn.release();

        return result[0].insertId

    } catch (err) {
        throw new BaseError(status.DB_ERROR);
    }
}

export const checkAttendeeExist = async (eventId, groupUserId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(checkDuplicateAttendee, [eventId, groupUserId]);

        conn.release();

        return result[0].isExist

    } catch (err) {
        throw new BaseError(status.DB_ERROR);
    }
}

export const retrieveAllEvents = async (groupId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectEventsAll, groupId);

        conn.release();

        return result

    } catch (err) {
        throw new BaseError(status.DB_ERROR);
    }
}

export const retrieveMonthlyEvents = async (body, month) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectMonthlyEvents, [body.groupId, month, month, body.groupUserId]);

        conn.release();

        return result

    } catch (err) {
        throw new BaseError(status.DB_ERROR);
    }
}

export const retrieveRecentlyEndedAndUpcoming = async (body) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectRecentlyEndAndUpcomingEvent, [body.groupId, body.groupId]);

        conn.release();

        return result

    } catch (err) {
        throw new BaseError(status.DB_ERROR);
    }
}