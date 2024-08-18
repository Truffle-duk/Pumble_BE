import express from "express";
import asyncHandler from "express-async-handler"
import authChecker from "../middleware/authChecker.js";
import {updateUserNickname} from "./user.controller.js";
export const userRouter = express.Router()

userRouter.patch("/api/user/nickname", authChecker, asyncHandler(await updateUserNickname))