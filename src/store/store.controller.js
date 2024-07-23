import {response} from "../../config/response.js";
import {status} from "../../config/responseStatus.js";
import {
    addNewEntry,
    addNewItem,
    getItemDetail,
    getItemsByCategory,
    getRecentItems,
    patchStatus
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

export const entryCreate = async (req, res, next) => {
    res.send(response(status.SUCCESS, await addNewEntry(req.params.id, req.body)))
}

export const drawWinner = async (req, res, next) => {
    res.send(response(status.SUCCESS, await patchStatus(req.params.id)))
}