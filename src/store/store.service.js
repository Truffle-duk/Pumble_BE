import {
    addItem, findTokenCount,
    retrieveItemDetails,
    retrieveItemsByCategory,
    retrieveRecentItems, updateGoodsCnt,
} from "./store.model.js";
import dotenv from "dotenv";
import {itemResponseDTO, itemsResponseDTO} from "./store.dto.js";
import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";

dotenv.config()

export const addNewItem = async (groupId, body, imageUrl) => {
    const params = [
        body.name,
        body.price,
        body.category,
        imageUrl,
        groupId
    ]

    const insertNewItemResult = await addItem(params)

    return {itemId: insertNewItemResult}
}

export const getRecentItems = async (groupId) => {
    const getRecentItemsResult = await retrieveRecentItems(groupId)

    return itemsResponseDTO(getRecentItemsResult)
}

export const getItemsByCategory = async (groupId, category) => {
    const getItemsByCategoryResult = await retrieveItemsByCategory(groupId, category)

    return itemsResponseDTO(getItemsByCategoryResult)
}

export const getItemDetail = async (groupId, itemId) => {
    const getItemResult = await retrieveItemDetails(groupId, itemId)

    return itemResponseDTO(getItemResult)
}

export const updateGoodsCountService = async (body, gUserId) => {
    const amountHeld = await findTokenCount(gUserId);
    if (body.price > amountHeld) {
        throw new BaseError(status.LACK_OF_AMOUNT)
    }

    const updateResult = await updateGoodsCnt(body.price, gUserId)
    if (updateResult.changedRows !== 1) {
        throw new BaseError(status.INTERNAL_SERVER_ERROR)
    }

    return {updatedAt: new Date()}
}
