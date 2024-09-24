import {response} from "../../config/response.js";
import {status} from "../../config/responseStatus.js";
import {BaseError} from "../../config/error.js";
import {
    eraseCommentService, eraseNoticeService,
    erasePostService,
    retrieveCommentListService, retrieveNoticeListService, retrievePostListService, retrievePostService,
    uploadCommentService, uploadNoticeService,
    uploadPostService
} from "./community.service.js";

export const uploadPost = async (req, res, next) => {
    const newPostId = await uploadPostService(req.groupId, req.groupUserId, req.body)
    const responseDTO = {
        groupId: req.groupId,
        groupUserRole: req.groupUserRole,
        newPostId: newPostId
    }
    res.send(response(status.SUCCESS, responseDTO))
}

export const uploadComment = async (req, res, next) => {
    res.send(response(status.SUCCESS, await uploadCommentService(req.params.postId, req.groupUserId, req.body)))
}

export const erasePost = async (req, res, next) => {
    res.send(response(status.SUCCESS, await erasePostService(req.groupUserId, req.params.postId)))
}

export const eraseComment = async (req, res, next) => {
    res.send(response(status.SUCCESS, await eraseCommentService(req.groupUserId, req.params.commentId)))
}

export const retrieveCommentList = async (req, res, next) => {
    // 1. 댓글 목록 조회
    const commentList = await retrieveCommentListService(req.groupUserId, req.params.postId)

    // 2. 댓글 요소 구조 정리
    const organizedList = commentList.map((comment) => {
        let isWriter = comment.group_user_id === req.groupUserId;

        return {
            comment: {
                commentId: comment.comment_id,
                content: comment.content,
                createdAt: comment.created_at
            },
            writer: {
                isWriter: isWriter,
                nickname: comment.nickname,
                profileImg: comment.profile_image
            }
        }
    })

    const responseDTO = {
        commentList: organizedList,
        commentListSize: organizedList.length
    }

    res.send(response(status.SUCCESS, responseDTO))
}

export const retrievePost = async (req, res, next) => {
    const post = await retrievePostService(req.params.postId)

    if (post.type !== 'normal') {
        throw new BaseError(status.WRONG_REQUEST_TYPE)
    }

    const responseDTO = {
        post: {
            postId: post.post_id,
            title: post.title,
            content: post.content,
            createdAt: post.created_at
        },
        writer: {
            isWriter: post.group_user_id === req.groupUserId,
            nickname: post.nickname,
            profileImg: post.profile_image
        }
    }
    res.send(response(status.SUCCESS, responseDTO))
}

export const retrieveNotice = async (req, res, next) => {
    const notice = await retrievePostService(req.params.noticeId)

    if (notice.type !== 'notice') {
        throw new BaseError(status.WRONG_REQUEST_TYPE)
    }

    const responseDTO = {
        post: {
            postId: notice.post_id,
            title: notice.title,
            content: notice.content,
            createdAt: notice.created_at
        },
        writer: {
            hasAuthority: req.groupUserRole !== 'member',
            nickname: notice.nickname,
            profileImg: notice.profile_image
        }
    }
    res.send(response(status.SUCCESS, responseDTO))
}

export const uploadNotice = async (req, res, next) => {
    // 권한 체크(운영진 이상)
    if (req.groupUserRole === 'member') {
        throw new BaseError(status.NO_AUTHORITY)
    }

    const newNoticeId = await uploadNoticeService(req.groupId, req.groupUserId, req.body)
    const responseDTO = {
        groupId: req.groupId,
        groupUserRole: req.groupUserRole,
        newNoticeId: newNoticeId
    }

    res.send(response(status.SUCCESS, responseDTO))
}

export const eraseNotice = async (req, res, next) => {
    // 권한 체크(운영진 이상)
    if (req.groupUserRole === 'member') {
        throw new BaseError(status.NO_AUTHORITY)
    }

    res.send(response(status.SUCCESS, await eraseNoticeService(req.groupUserId, req.params.noticeId)))
}

export const retrievePostList = async (req, res, next) => {
    // 1. 목록 조회
    const retrievePostListResult = await retrievePostListService(req.groupId, req.query.page)
    const postList = retrievePostListResult.postList

    // 2. 구조 정리
    const responseDTO = postList.map((post) => {
        return {
            postId: post.post_id,
            title: post.title,
            content: post.content,
            createdAt: post.created_at,
            commentCount: post.comment_count
        }
    })

    res.send(response(status.SUCCESS, {postList: responseDTO, isLast: retrievePostListResult.isLast}))
}

export const retrieveNoticeList = async (req, res, next) => {
    // 1. 목록 조회
    const retrieveNoticeListResult = await retrieveNoticeListService(req.groupId, req.query.page)
    const noticeList = retrieveNoticeListResult.noticeList

    // 2. 구조 정리
    const responseDTO = noticeList.map((notice) => {
        return {
            notice: {
                noticeId: notice.post_id,
                title: notice.title,
                createdAt: notice.created_at
            },
            writer: {
                nickname: notice.nickname,
                isWriter: notice.group_user_id === req.groupUserId
            }
        }
    })

    res.send(response(status.SUCCESS, {noticeList: responseDTO, isLast: retrieveNoticeListResult.isLast}))
}