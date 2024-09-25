import express from "express";
import asyncHandler from "express-async-handler"
import {
    itemCreate, selectItemCtrl, selectItemsByCategoryCtrl, selectRecentItems
} from "./store.controller.js";
import authChecker from "../middleware/authChecker.js";
import groupUserInfoGetter from "../middleware/groupUserInfoGetter.js";

export const storeRouter = express.Router()
const storeBasePath = "/api/store/:groupId"

storeRouter.post(storeBasePath, [authChecker, groupUserInfoGetter], asyncHandler(await itemCreate)) //상품 추가
storeRouter.get(storeBasePath + '/recent', [authChecker, groupUserInfoGetter], asyncHandler(await selectRecentItems)) //최신 상품 4개 조회
storeRouter.get(storeBasePath + '/list', [authChecker, groupUserInfoGetter], asyncHandler(await selectItemsByCategoryCtrl)) //카테고리별 상품 조회
storeRouter.get(storeBasePath + '/item/:itemId', [authChecker, groupUserInfoGetter], asyncHandler(await selectItemCtrl)) //상품 상세 조회
