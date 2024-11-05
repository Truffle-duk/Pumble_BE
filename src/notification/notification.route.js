import express from "express";
import authChecker from "../middleware/authChecker.js";
import groupUserInfoGetter from "../middleware/groupUserInfoGetter.js";
import asyncHandler from "express-async-handler";
import {getAllNotification} from "./notification.controller.js";

export const notificationRouter = express.Router()
//알림 추가(내부 함수)
notificationRouter.get('/api/notification/:groupId', [authChecker, groupUserInfoGetter], asyncHandler(await getAllNotification)) //알림 목록 반환