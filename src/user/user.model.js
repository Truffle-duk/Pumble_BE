import {pool} from "../../config/database.js";
import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {updateUserNameSQL, selectUserById} from "./user.sql.js";

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