import {pool} from "../../config/database.js";
import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {
    insertNewGroup, insertNewGroupOwner, insertNewGroupUser,
    selectGroupByCode,
    selectGroupCode,
    selectGroupInfoByUserId
} from "./home.sql.js";

export const createGroup = async (params) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(insertNewGroup, params);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const findDuplicateCode = async (code) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectGroupCode, code);

        conn.release();

        return result[0];

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const joinGroup = async (params) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(insertNewGroupUser, params);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const findJoinedGroups = async (userId) => {
    try{
        const conn = await pool.getConnection();

        const result = await pool.query(selectGroupInfoByUserId, userId);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const findGroupByCode = async (code) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectGroupByCode, code);

        conn.release();

        return result[0];

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const createNewGroupOwner = async (params) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(insertNewGroupOwner, params);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}