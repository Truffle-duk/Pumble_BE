import express from "express";
import asyncHandler from "express-async-handler"
import {checkEmailDuplicate, sendVerificationCode, signIn, signUp, test, verifyEmail} from "./auth.controller.js";

export const authRouter = express.Router()

authRouter.post('/api/auth/verifyDuplicate', asyncHandler(await checkEmailDuplicate)) //이메일 중복 확인
authRouter.post('/api/auth/sendCode', asyncHandler(await sendVerificationCode)) //이메일 인증
authRouter.post('/api/auth/verifyEmail', asyncHandler(await verifyEmail)) //인증 코드
authRouter.post('/api/auth/signup', asyncHandler(await signUp)) //로컬 회원가입
authRouter.post('/api/auth/signin', asyncHandler(await signIn)) //로그인

authRouter.get('/test', asyncHandler(await test))