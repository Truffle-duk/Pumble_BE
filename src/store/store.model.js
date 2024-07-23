import {pool} from "../../config/database.js";
import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {
    insertNewItem,
    select4ItemsRecent,
    selectItemsByCategory,
    selectItemDetails,
    insertNewLotteryInfo,
    insertNewEntry,
    selectEntries,
    selectLottery,
    updateEntryStatus,
    updateLotteryStatus, selectGroupUser
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

export const retrieveRecentItems = async (data) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(select4ItemsRecent, data.groupId);

        conn.release();

        return result;

    } catch (err) {
        throw new BaseError(status.DB_ERROR);
    }
}

export const retrieveItemsByCategory = async (data) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectItemsByCategory, [data.groupId, data.category]);

        conn.release();

        return result;

    } catch (err) {
        throw new BaseError(status.DB_ERROR);
    }
}

export const retrieveItemDetails = async (data) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectItemDetails, data.id);

        conn.release();

        return result[0];

    } catch (err) {
        throw new BaseError(status.DB_ERROR);
    }
}

export const addLotteryInfo = async (data) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(insertNewLotteryInfo, data);

        conn.release();

        return result.insertId;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.DB_ERROR);
    }
}

export const addEntry = async (id, groupUserId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(insertNewEntry, [id, groupUserId]);

        conn.release();

        return result.insertId;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.DB_ERROR);
    }
}

export const retrieveLottery = async (lotteryId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectLottery, lotteryId);

        conn.release();

        return result[0];

    } catch (err) {
        console.log(err)
        throw new BaseError(status.DB_ERROR);
    }
}

export const retrieveEntries = async (lotteryId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectEntries, lotteryId);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.DB_ERROR);
    }
}

export const changeEntryStatus = async (entryId, status) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(updateEntryStatus, [status, entryId]);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.DB_ERROR);
    }
}

export const changeLotteryStatus = async (lotteryId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(updateLotteryStatus, lotteryId);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.DB_ERROR);
    }
}

export const retrieveWinnerInfo = async (groupUserId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectGroupUser, groupUserId);

        conn.release();

        return result[0];

    } catch (err) {
        console.log(err)
        throw new BaseError(status.DB_ERROR);
    }
}