import {pool} from "../../config/database.js";
import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {
    deleteComment,
    deletePost,
    insertNewComment, insertNewNotice,
    insertNewPost,
    selectCommentByCommentId, selectCommentByPostId, selectNoticeCount, selectNoticeList,
    selectPostByPostId, selectPostCount, selectPostList
} from "./community.sql.js";

export const createPost = async (category, params) => {
    let query
    switch (category) {
        case 'post':
            query = insertNewPost
            break
        case 'notice':
            query = insertNewNotice
            break
    }

    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(query, params);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const createComment = async (params) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(insertNewComment, params);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const eraseObject = async (target, targetId) => { //target: post, comment, notice
    let query = ""
    switch (target) {
        case 'post':
            query = deletePost
            break
        case 'notice':
            query = deletePost
            break
        case 'comment':
            query = deleteComment
            break
    }

    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(query, targetId);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const retrievePost = async (postId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectPostByPostId, postId);

        conn.release();

        return result[0];

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const retrieveComment = async (commentId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectCommentByCommentId, commentId);

        conn.release();

        return result[0];

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const retrieveCommentList = async (postId) => {
    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(selectCommentByPostId, postId);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const retrievePostList = async (target, groupId, offset) => { //target: post, notice
    let query = ""
    switch (target) {
        case 'post':
            query = selectPostList
            break
        case 'notice':
            query = selectNoticeList
            break
    }

    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(query, [groupId, offset]);

        conn.release();

        return result;

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}

export const retrievePostCount = async (target, groupId) => { //target: post, notice
    let query = ""
    switch (target) {
        case 'post':
            query = selectPostCount
            break
        case 'notice':
            query = selectNoticeCount
            break
    }

    try{
        const conn = await pool.getConnection();

        const [result] = await pool.query(query, groupId);

        conn.release();

        return result[0];

    } catch (err) {
        console.log(err)
        throw new BaseError(status.INTERNAL_SERVER_ERROR);
    }
}