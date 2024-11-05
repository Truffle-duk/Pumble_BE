import express from "express";
import asyncHandler from "express-async-handler"
import authChecker from "../middleware/authChecker.js";
import {drawout, updateUserNickname, getUserNicknameAndEmail, getMyGroup, changeFcmToken} from "./user.controller.js";
export const userRouter = express.Router()

userRouter.patch("/api/user/nickname", authChecker, asyncHandler(await updateUserNickname))
userRouter.get("/api/user", authChecker, asyncHandler(await getUserNicknameAndEmail))
userRouter.patch("/api/user", authChecker, asyncHandler(await drawout))
userRouter.get("/api/user/group", authChecker, asyncHandler(await getMyGroup))
userRouter.patch('/api/user/fcm', authChecker, asyncHandler(await changeFcmToken))