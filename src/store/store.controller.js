import {response} from "../../config/response.js";
import {status} from "../../config/responseStatus.js";
import {
    addNewItem,
    getItemDetail,
    getItemsByCategory,
    getRecentItems,
} from "./store.service.js";

export const itemCreate = async (req, res, next) => {
    res.send(response(status.SUCCESS, await addNewItem(req.body)))
}
export const selectRecentItems = async (req, res, next) => {
    res.send(response(status.SUCCESS, await getRecentItems(req.query)))
}
export const selectItemsByCategoryCtrl = async (req, res, next) => {
    res.send(response(status.SUCCESS, await getItemsByCategory(req.query)))
}

export const selectItemCtrl = async (req, res, next) => {
    res.send(response(status.SUCCESS, await getItemDetail(req.params)))
}