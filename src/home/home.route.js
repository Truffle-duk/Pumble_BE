import express from "express";
import asyncHandler from "express-async-handler"
import authChecker from "../middleware/authChecker.js";
import groupUserInfoGetter from "../middleware/groupUserInfoGetter.js";
import {createGroup, joinGroup, retrieveJoinedGroup, retrieveSelectedGroupInfo} from "./home.controller.js";

export const homeRouter = express.Router()
const homeBasePath = "/api/home/group"

homeRouter.post(homeBasePath + "/create", authChecker, asyncHandler(await createGroup)) //모임 생성
homeRouter.post(homeBasePath + "/join", authChecker, asyncHandler(await joinGroup)) //모임 가입

homeRouter.get(homeBasePath, authChecker, asyncHandler(await retrieveJoinedGroup)) //참여 모임 조회
homeRouter.get(homeBasePath + "/:groupId", [authChecker, groupUserInfoGetter], asyncHandler(await retrieveSelectedGroupInfo)) //모임 선택

