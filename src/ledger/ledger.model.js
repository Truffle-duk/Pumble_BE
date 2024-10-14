import {pool} from "../../config/database.js";
import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {insertNewReceipt} from "./ledger.sql.js";

export const createNewReceipt = async (params) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(insertNewReceipt, params);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}