import {pool} from "../../config/database.js";
import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {insertNewUser, selectEmailExist, selectPassword, selectUser} from "./auth.sql.js";

export const retrieveEmailExist = async (email) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectEmailExist, email);

        conn.release();

        return result[0];

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const createUser = async (params) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(insertNewUser, params);

        conn.release();

        return result[0];

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const retrieveUserByEmail = async (email) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectUser, email);
        console.log(result)

        conn.release();

        return result[0];

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const retrievePasswordByEmail = async (email) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectPassword, email);
        console.log(result)

        conn.release();

        return result[0];

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}