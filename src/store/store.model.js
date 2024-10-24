import {pool} from "../../config/database.js";
import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {
    insertNewItem,
    select4ItemsRecent,
    selectItemsByCategory,
    selectItemDetails, updateGroupUser, selectToken,
} from "./store.sql.js";

export const addItem = async (data) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(insertNewItem, data);

        conn.release();

        return result.insertId;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.DB_ERROR);
    }
}

export const retrieveRecentItems = async (groupId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(select4ItemsRecent, groupId);

        conn.release();

        return result;

    } catch (err) {
        throw new BaseError(status.DB_ERROR);
    }
}

export const retrieveItemsByCategory = async (groupId, category) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectItemsByCategory, [groupId, category]);

        conn.release();

        return result;

    } catch (err) {
        throw new BaseError(status.DB_ERROR);
    }
}

export const retrieveItemDetails = async (groupId, itemId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectItemDetails, [groupId, itemId]);

        conn.release();

        return result[0];

    } catch (err) {
        throw new BaseError(status.DB_ERROR);
    }
}

export const updateGoodsCnt = async (price, gUserId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(updateGroupUser, [price, gUserId]);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const findTokenCount = async (gUserId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectToken, gUserId);

        conn.release();

        return result[0].token;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}