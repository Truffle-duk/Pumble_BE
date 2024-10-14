import express from "express";
import asyncHandler from "express-async-handler"
import authChecker from "../middleware/authChecker.js";
import groupUserInfoGetter from "../middleware/groupUserInfoGetter.js";
import {imageUploader} from "../middleware/s3Manager.js";
import {
    appoint, changeGroupPassword,
    changeProfileImage,
    changeProfileNickname, checkPassword, deleteGroup, demotion, driveOut, entrust,
    retrieveAllGroupUser,
    withdrawGroup
} from "./groupUser.controller.js";
export const groupUserRouter = express.Router()
const groupUserBasePath = "/api/group/:groupId"

groupUserRouter.delete(groupUserBasePath, [authChecker, groupUserInfoGetter], asyncHandler(await withdrawGroup))
groupUserRouter.patch(groupUserBasePath + "/profile/image", [authChecker, groupUserInfoGetter, imageUploader.single('image')], asyncHandler(await changeProfileImage))
groupUserRouter.patch(groupUserBasePath + '/profile/nickname', [authChecker, groupUserInfoGetter], asyncHandler(await changeProfileNickname))

// 모임장 권한 api
groupUserRouter.get(groupUserBasePath + '/members', [authChecker, groupUserInfoGetter], asyncHandler(await retrieveAllGroupUser))
groupUserRouter.patch(groupUserBasePath + '/members/driveOut', [authChecker, groupUserInfoGetter], asyncHandler(await driveOut)) //내보내기
groupUserRouter.patch(groupUserBasePath + '/members/appoint', [authChecker, groupUserInfoGetter], asyncHandler(await appoint)) //임명
groupUserRouter.patch(groupUserBasePath + '/members/demotion', [authChecker, groupUserInfoGetter], asyncHandler(await demotion)) //강등
groupUserRouter.patch(groupUserBasePath + '/members/entrust', [authChecker, groupUserInfoGetter], asyncHandler(await entrust)) //위임
groupUserRouter.delete(groupUserBasePath + '/delete', [authChecker, groupUserInfoGetter], asyncHandler(await deleteGroup)) //모임 삭제
groupUserRouter.patch(groupUserBasePath + '/password', [authChecker, groupUserInfoGetter], asyncHandler(await changeGroupPassword)) //비밀번호 변경
groupUserRouter.post(groupUserBasePath + '/password', [authChecker, groupUserInfoGetter], asyncHandler(await checkPassword)) //비밀번호 확인