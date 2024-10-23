import {response} from "../../config/response.js";
import {status} from "../../config/responseStatus.js";
import {
    addNewItem,
    getItemDetail,
    getItemsByCategory,
    getRecentItems, updateGoodsCountService,
} from "./store.service.js";
import {BaseError} from "../../config/error.js";

export const itemCreate = async (req, res, next) => {
    if (req.groupUserRole === 'member') {
        throw new BaseError(status.NO_AUTHORITY)
    }

    res.send(response(status.SUCCESS, await addNewItem(req.groupId, req.body, req.s3ObjectUrl)))
}
export const selectRecentItems = async (req, res, next) => {
    res.send(response(status.SUCCESS, await getRecentItems(req.groupId)))
}
export const selectItemsByCategoryCtrl = async (req, res, next) => {
    res.send(response(status.SUCCESS, await getItemsByCategory(req.groupId, req.query.category)))
}

export const selectItemCtrl = async (req, res, next) => {
    res.send(response(status.SUCCESS, await getItemDetail(req.groupId, req.params.itemId)))
}

export const updateGoodsCount = async (req, res, next) => {
    res.send(response(status.SUCCESS, await updateGoodsCountService(req.body, req.groupUserId)))
}