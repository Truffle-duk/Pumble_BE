import express from "express";
import asyncHandler from "express-async-handler"
import authChecker from "../middleware/authChecker.js";
import {
    eraseComment, eraseNotice,
    erasePost,
    retrieveCommentList, retrieveNotice, retrieveNoticeList,
    retrievePost, retrievePostList,
    uploadComment, uploadNotice,
    uploadPost
} from "./community.controller.js";
import groupUserInfoGetter from "../middleware/groupUserInfoGetter.js";

export const communityRouter = express.Router()
const communityBasePath = "/api/community/:groupId"

communityRouter.post(communityBasePath + "/post", [authChecker, groupUserInfoGetter], asyncHandler(await uploadPost)) //글 등록
communityRouter.delete(communityBasePath + "/post/:postId", [authChecker, groupUserInfoGetter], asyncHandler(await erasePost)) //글 삭제

communityRouter.post(communityBasePath + "/comment/:postId", [authChecker, groupUserInfoGetter], asyncHandler(await uploadComment)) //댓글 등록
communityRouter.delete(communityBasePath + "/comment/:commentId", [authChecker, groupUserInfoGetter], asyncHandler(await eraseComment)) //댓글 등록

communityRouter.get(communityBasePath + "/post/list", [authChecker, groupUserInfoGetter], asyncHandler(await retrievePostList)); //글 목록 조회
communityRouter.get(communityBasePath + "/notice/list", [authChecker, groupUserInfoGetter], asyncHandler(await retrieveNoticeList)) //공지 목록 조회
communityRouter.get(communityBasePath + "/post/:postId", [authChecker, groupUserInfoGetter], asyncHandler(await retrievePost)) //글 상세 조회
communityRouter.get(communityBasePath + "/notice/:noticeId", [authChecker, groupUserInfoGetter], asyncHandler(await retrieveNotice)) //공지 상세 조회
communityRouter.get(communityBasePath + "/comment/:postId", [authChecker, groupUserInfoGetter], asyncHandler(await retrieveCommentList)) //댓글 조회

communityRouter.post(communityBasePath + "/notice", [authChecker, groupUserInfoGetter], asyncHandler(await uploadNotice)) //공지 등록
communityRouter.delete(communityBasePath + "/notice/:noticeId", [authChecker, groupUserInfoGetter], asyncHandler(await eraseNotice)) //공지 삭제