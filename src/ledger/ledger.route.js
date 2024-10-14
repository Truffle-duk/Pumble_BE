import authChecker from "../middleware/authChecker.js";
import groupUserInfoGetter from "../middleware/groupUserInfoGetter.js";
import asyncHandler from "express-async-handler";
import express from "express";
import {addNewReceipt} from "./ledger.controller.js";
import {imageUploader} from "../middleware/s3Manager.js";

export const ledgerRouter = express.Router()
ledgerRouter.post('/api/ledger/:groupId/receipt', [authChecker, groupUserInfoGetter, imageUploader.single('image')], asyncHandler(await addNewReceipt))