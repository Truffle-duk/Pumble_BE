import express from "express";
import asyncHandler from "express-async-handler"
import {
    eventCreate,
    eventJoin,
    recentlyEndAndUpcoming,
    searchAllEvents,
    searchMonthlyEvents
} from "./event.controller.js";

export const eventRouter = express.Router()

eventRouter.post('/api/event', asyncHandler(await eventCreate)) //일정 추가

eventRouter.post('/api/event/:id', asyncHandler(await eventJoin)) //참여 신청

eventRouter.get('/api/events/all', asyncHandler(await searchAllEvents)) //전체 일정 조회

eventRouter.get('/api/events/month', asyncHandler(await searchMonthlyEvents)) //이번달 일정 조회

eventRouter.get('/api/events/lastAndNext', asyncHandler(await recentlyEndAndUpcoming)) //지난, 최근 일정 조회(각 1개)