import {
    addItem,
    retrieveItemDetails,
    retrieveItemsByCategory,
    retrieveRecentItems,
} from "./store.model.js";
import dotenv from "dotenv";
import {itemResponseDTO, itemsResponseDTO} from "./store.dto.js";

dotenv.config()

export const addNewItem = async (body) => {
    const params = [
        body.name,
        body.price,
        body.category,
        body.image,
        body.groupId,
    ]

    const insertNewItemResult = await addItem(params)

    return {itemId: insertNewItemResult}
}

export const getRecentItems = async (body) => {
    const getRecentItemsResult = await retrieveRecentItems(body)

    return itemsResponseDTO(getRecentItemsResult)
}

export const getItemsByCategory = async (body) => {
    const getItemsByCategoryResult = await retrieveItemsByCategory(body)

    return itemsResponseDTO(getItemsByCategoryResult)
}

export const getItemDetail = async (body) => {
    const getItemResult = await retrieveItemDetails(body)

    return itemResponseDTO(getItemResult)
}
