import {pool} from "../../config/database.js";
import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {insertNewNotification, selectGroupUserTokenByGID, selectNotificationAll} from "./notification.sql.js";

export const insertNotification = async (params) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(insertNewNotification, params);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const selectNotifications = async (groupId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectNotificationAll, groupId);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const selectGroupUserToken = async (groupId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectGroupUserTokenByGID, groupId);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}