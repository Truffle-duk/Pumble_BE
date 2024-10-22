import {pool} from "../../config/database.js";
import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {
    selectGroupUserNameAndImage,
    deleteGroup,
    deleteGroupUser, selectAllGroupUser, selectGroupPassword,
    selectImageUrl, updateGroupPassword,
    updateGroupUserImage,
    updateGroupUserNickname, updateGroupUserRoleToLeader, updateGroupUserRoleToMember, updateGroupUserRoleToStaff,
    updateGroupUserStatus
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
    try {
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectGroupUserNameAndImage, gUserId);

        conn.release();

        return result[0];
    } catch (err) {
        console.log(err)
        throw new BaseError(status.DB_ERROR);
    }
}

export const changeGroupUserRole = async (target, gUserId) => {
    let query
    if (target === 'driveOut') {
        query = updateGroupUserStatus
    } else if (target === 'appoint') {
        query = updateGroupUserRoleToStaff
    } else if (target === 'demotion') {
        query = updateGroupUserRoleToMember
    } else if (target === 'entrust') {
        query = updateGroupUserRoleToLeader
    }

    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(query, gUserId);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.DB_ERROR);
    }
}

export const findAllGroupUser = async (groupId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectAllGroupUser, groupId);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.DB_ERROR);
    }
}

export const findGroupPasswordById = async (groupId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectGroupPassword, groupId);

        conn.release();

        return result[0].password;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.DB_ERROR);
    }
}

export const deleteGroupModel = async (groupId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(deleteGroup, groupId);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.DB_ERROR);
    }
}

export const updateGroupPasswordModel = async (groupId, newPassword) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(updateGroupPassword, [newPassword, groupId]);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.DB_ERROR);
    }
}