import express from "express";
import asyncHandler from "express-async-handler"
import authChecker from "../middleware/authChecker.js";
import {getUserNickname, updateUserNickname} from "./user.controller.js";
export const userRouter = express.Router()

userRouter.patch("/api/user/nickname/:userId", asyncHandler(await updateUserNickname))
userRouter.get("/api/user/:userId", asyncHandler(await getUserNickname))