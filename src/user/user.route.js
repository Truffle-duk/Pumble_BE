import express from "express";
import asyncHandler from "express-async-handler"
import authChecker from "../middleware/authChecker.js";
import {drawout, updateUserNickname, getUserNicknameAndEmail} from "./user.controller.js";
export const userRouter = express.Router()

userRouter.patch("/api/user/nickname", authChecker, asyncHandler(await updateUserNickname))
userRouter.get("/api/user", authChecker, asyncHandler(await getUserNicknameAndEmail))
userRouter.patch("/api/user", authChecker, asyncHandler(await drawout))