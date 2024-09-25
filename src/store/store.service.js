import {
    addItem,
    retrieveItemDetails,
    retrieveItemsByCategory,
    retrieveRecentItems,
} from "./store.model.js";
import dotenv from "dotenv";
import {itemResponseDTO, itemsResponseDTO} from "./store.dto.js";

dotenv.config()

export const addNewItem = async (groupId, body) => {
    const params = [
        body.name,
        body.price,
        body.category,
        body.image,
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
