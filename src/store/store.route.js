import express from "express";
import asyncHandler from "express-async-handler"
import {
    itemCreate, selectItemCtrl, selectItemsByCategoryCtrl, selectRecentItems
} from "./store.controller.js";

export const storeRouter = express.Router()

storeRouter.post('/api/store', asyncHandler(await itemCreate)) //상품 추가
storeRouter.get('/api/store/recent', asyncHandler(await selectRecentItems)) //최신 상품 4개 조회
storeRouter.get('/api/store', asyncHandler(await selectItemsByCategoryCtrl)) //카테고리별 상품 조회
storeRouter.get('/api/store/:id', asyncHandler(await selectItemCtrl)) //상품 상세 조회
