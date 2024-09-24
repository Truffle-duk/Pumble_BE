import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {
    createComment,
    createPost,
    eraseObject,
    retrieveComment,
    retrieveCommentList,
    retrievePost, retrievePostCount, retrievePostList
} from "./community.model.js";

export const uploadPostService = async (groupId, groupUserId, body) => {
    const params = [groupId, groupUserId, body.title, body.content]

    const uploadNewPostResult = await createPost('post', params)

    if (uploadNewPostResult && uploadNewPostResult.affectedRows === 1) {
        return uploadNewPostResult.insertId
    } else {
        throw new BaseError(status.INTERNAL_SERVER_ERROR)
    }
}

export const uploadCommentService = async (postId, groupUserId, body) => {
    const retrievePostResult = await retrievePost(postId)
    if (!retrievePostResult) {
        throw new BaseError(status.POST_NOT_EXIST)
    }

    const params = [postId, groupUserId, body.content]

    const uploadNewCommentResult = await createComment(params)

    if (uploadNewCommentResult && uploadNewCommentResult.affectedRows === 1) {
        return {commentId: uploadNewCommentResult.insertId}
    } else {
        throw new BaseError(status.INTERNAL_SERVER_ERROR)
    }
}

export const erasePostService = async (groupUserId, postId) => {
    // 1. 작성자 확인
    const requestPost = await retrievePost(postId)
    if (!requestPost) {
        throw new BaseError(status.POST_NOT_EXIST)
    }
    if (requestPost.group_user_id !== groupUserId) {
        throw new BaseError(status.NOT_AUTHOR)
    }

    // 2. 삭제
    const deletePostResult = await eraseObject("post", postId)

    if (deletePostResult && deletePostResult.affectedRows === 1) {
        return {deletedAt: new Date()}
    } else {
        throw new BaseError(status.INTERNAL_SERVER_ERROR)
    }
}

export const eraseCommentService = async (groupUserId, commentId) => {
    // 1. 작성자 확인
    const requestComment = await retrieveComment(commentId)
    if (!requestComment) {
        throw new BaseError(status.COMMENT_NOT_EXIST)
    }
    if (requestComment.group_user_id !== groupUserId) {
        throw new BaseError(status.NOT_AUTHOR)
    }

    // 2. 삭제
    const deleteCommentResult = await eraseObject("comment", commentId)

    if (deleteCommentResult && deleteCommentResult.affectedRows === 1) {
        return {deletedAt: new Date()}
    } else {
        throw new BaseError(status.INTERNAL_SERVER_ERROR)
    }
}

export const retrieveCommentListService = async (postId) => {
    return await retrieveCommentList(postId)
}

export const retrievePostService = async (postId) => {
    return await retrievePost(postId)
}

export const uploadNoticeService = async (groupId, groupUserId, body) => {
    const params = [groupId, groupUserId, body.title, body.content]

    const uploadNewPostResult = await createPost('notice', params)

    if (uploadNewPostResult && uploadNewPostResult.affectedRows === 1) {
        return uploadNewPostResult.insertId
    } else {
        throw new BaseError(status.INTERNAL_SERVER_ERROR)
    }
}

export const eraseNoticeService = async (groupUserId, noticeId) => {
    // 1. 작성자 확인
    const requestNotice = await retrievePost(noticeId)
    if (!requestNotice) {
        throw new BaseError(status.POST_NOT_EXIST)
    }
    if (requestNotice.group_user_id !== groupUserId) {
        throw new BaseError(status.NOT_AUTHOR)
    }

    // 2. 삭제
    const deleteNoticeResult = await eraseObject("notice", noticeId)

    if (deleteNoticeResult && deleteNoticeResult.affectedRows === 1) {
        return {deletedAt: new Date()}
    } else {
        throw new BaseError(status.INTERNAL_SERVER_ERROR)
    }
}

export const retrievePostListService = async (groupId, page) => {
    const postCount = await retrievePostCount('post', groupId)
    const maxPage = Math.floor(postCount.post_count/10)

    let offset = 1
    if (page-1 < 0) {
        offset = 0
    } else if (page-1 > maxPage) {
        throw new BaseError(status.PAGE_OUT_OF_RANGE)
    } else {
        offset = (page - 1) * 10
    }

    const isLast = page-1 === maxPage
    const postList = await retrievePostList('post', groupId, offset)

    return {postList: postList, isLast: isLast}
}

export const retrieveNoticeListService = async (groupId, page) => {
    const noticeCount = await retrievePostCount('notice', groupId)
    const maxPage = Math.floor(noticeCount.notice_count/10)

    let offset = 1
    if (page-1 < 0) {
        offset = 0
    } else if (page-1 > maxPage) {
        throw new BaseError(status.PAGE_OUT_OF_RANGE)
    } else {
        offset = (page - 1) * 10
    }

    const isLast = page-1 === maxPage
    const noticeList = await retrievePostList('notice', groupId, offset)

    return {noticeList: noticeList, isLast: isLast}
}