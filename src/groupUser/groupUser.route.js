import express from "express";
import asyncHandler from "express-async-handler"
import authChecker from "../middleware/authChecker.js";
import groupUserInfoGetter from "../middleware/groupUserInfoGetter.js";
import {imageUploader} from "../middleware/s3Manager.js";
import {changeProfileImage, changeProfileNickname, getProfile, withdrawGroup} from "./groupUser.controller.js";
export const groupUserRouter = express.Router()
const groupUserBasePath = "/api/group/:groupId"

groupUserRouter.delete(groupUserBasePath, [authChecker, groupUserInfoGetter], asyncHandler(await withdrawGroup))
groupUserRouter.patch(groupUserBasePath + "/profile/image", [authChecker, groupUserInfoGetter, imageUploader.single('image')], asyncHandler(await changeProfileImage))
groupUserRouter.patch(groupUserBasePath + '/profile/nickname', [authChecker, groupUserInfoGetter], asyncHandler(await changeProfileNickname))
groupUserRouter.get(groupUserBasePath + '/profile', [authChecker, groupUserInfoGetter], asyncHandler(await getProfile))