import {pool} from "../../config/database.js";
import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {insertNewUser, selectEmailExist} from "./auth.sql.js";

export const retrieveEmailExist = async (email) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectEmailExist, email);

        conn.release();

        return result[0];

    } catch (err) {
        console.log(err)
        throw new BaseError(status.DB_ERROR);
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
        throw new BaseError(status.DB_ERROR);
    }
}