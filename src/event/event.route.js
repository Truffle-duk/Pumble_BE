import express from "express";
import asyncHandler from "express-async-handler"
import {
    eventCreate,
    eventJoin,
    recentlyEndAndUpcoming,
    searchAllEvents,
    searchMonthlyEvents
} from "./event.controller.js";
import authChecker from "../middleware/authChecker.js";
import groupUserInfoGetter from "../middleware/groupUserInfoGetter.js";

export const eventRouter = express.Router()
const eventBasePath = "/api/event/:groupId"

eventRouter.post(eventBasePath, [authChecker, groupUserInfoGetter], asyncHandler(await eventCreate)) //일정 추가

eventRouter.post(eventBasePath + '/join/:eventId', [authChecker, groupUserInfoGetter], asyncHandler(await eventJoin)) //참여 신청

eventRouter.get(eventBasePath + '/list/all', [authChecker, groupUserInfoGetter], asyncHandler(await searchAllEvents)) //전체 일정 조회

eventRouter.get(eventBasePath + '/list/month', [authChecker, groupUserInfoGetter], asyncHandler(await searchMonthlyEvents)) //이번달 일정 조회

eventRouter.get(eventBasePath + '/lastAndNext', [authChecker, groupUserInfoGetter], asyncHandler(await recentlyEndAndUpcoming)) //지난, 최근 일정 조회(각 1개)