import {pool} from "../../config/database.js";
import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {
    updateUserNameSQL,
    selectUserById,
    selectUserNameById,
    deactiveUserById,
    selectMyGroupById
} from "./user.sql.js";

export const updateUserName = async (params) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(updateUserNameSQL, params);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const retrieveUserNameById = async (userId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectUserNameById, userId);

        conn.release();

        return result[0];

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const retrieveUserById = async (userId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectUserById, userId);

        conn.release();

        return result[0];

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const updateUserStateToDeactivate = async (userId) => {
    try{
        const conn = await pool.getConnection();

        const requestDate = new Date()
        const formattedDate = requestDate.getFullYear() + '-' + requestDate.getMonth() + '-' + requestDate.getDate()

        const [result] = await pool.query(deactiveUserById, [formattedDate, userId]);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const retrieveMyGroup = async (userId) => {
    try{
        const conn = await pool.getConnection();
        const [result] = await pool.query(selectMyGroupById, userId);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}