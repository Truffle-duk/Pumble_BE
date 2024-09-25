import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {pool} from "../../config/database.js";
import asyncHandler from "express-async-handler";

const selectGroupUserInfo = "SELECT group_user_id, role, status FROM GroupUser WHERE user_id = ? AND group_id = ?;";

const retrieveGroupUserId = async (userId, groupId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectGroupUserInfo, [userId, groupId]);

        conn.release();

        return result[0];

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

const groupUserInfoGetter = asyncHandler(async (req, res, next) => {
    if (req.userId && req.params.groupId) {
        const getGroupUserIdResult = await retrieveGroupUserId(req.userId, req.params.groupId)

        if (getGroupUserIdResult.status === 'kicked') {
            throw new BaseError(status.FORBIDDEN)
        }

        req.groupUserId = getGroupUserIdResult.group_user_id
        req.groupUserRole = getGroupUserIdResult.role
        req.groupId = parseInt(req.params.groupId)
        next();
    } else {
        console.log('groupUserIdGetter - information is not enough');
        throw new BaseError(status.LACK_OF_INFO)
    }
})

export default groupUserInfoGetter