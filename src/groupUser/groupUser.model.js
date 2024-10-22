import {pool} from "../../config/database.js";
import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {
    deleteGroupUser,
    selectGroupUserNameAndImage,
    selectImageUrl,
    updateGroupUserImage,
    updateGroupUserNickname
} from "./groupUser.sql.js";

export const withdrawGroupUser = async (gUserId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(deleteGroupUser, ['withdraw', gUserId]);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.DB_ERROR);
    }
}

export const changeGroupUserProfile = async (target, gUserId, newItem) => {
    let query
    if (target === 'image') {
        query = updateGroupUserImage
    } else if (target === 'nickname') {
        query = updateGroupUserNickname
    }

    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(query, [newItem, gUserId]);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.DB_ERROR);
    }
}

export const findImageUrlById = async (gUserId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectImageUrl, gUserId);

        conn.release();

        return result[0].profile_image;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.DB_ERROR);
    }
}

export const findNicknameAndImage = async (gUserId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectGroupUserNameAndImage, gUserId);

        conn.release();

        return result[0];

    } catch (err) {
        console.log(err)
        throw new BaseError(status.DB_ERROR);
    }
}