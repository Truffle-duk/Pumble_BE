import {
    addEntry,
    addItem,
    addLotteryInfo, changeEntryStatus, changeLotteryStatus, retrieveEntries,
    retrieveItemDetails,
    retrieveItemsByCategory, retrieveLottery,
    retrieveRecentItems, retrieveWinnerInfo
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
        body.type,
        body.groupId,
    ]

    const insertNewItemResult = await addItem(params)

    if (body.type === 'lottery') {
        const data = body.lottery
        const lotteryParams = [
            data.draw_date,
            data.winners_num,
            insertNewItemResult
        ]

        const insertNewLotteryResult = await addLotteryInfo(lotteryParams)
        return {lotteryId: insertNewLotteryResult}

    } else {
        return {itemId: insertNewItemResult}
    }
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

export const addNewEntry = async (id, body) => {
    const insertNewEntryResult = await addEntry(id, body.groupUserId)

    return {entryId: insertNewEntryResult}
}

export const patchStatus = async (lotteryId) => {
    //1. 추첨 정보, 응모자 리스트 가져오기
    const lotteryInfo = await retrieveLottery(lotteryId);
    const entryList = await retrieveEntries(lotteryId);

    //2. ID 추첨하기
    let winnerIdxList = []
    for (let i=0; i<lotteryInfo.winners_num; i++){
        const randResult = Math.floor(Math.random() * entryList.length)
        if (entryList.indexOf(randResult) === -1) {
            winnerIdxList.push(randResult)
        } else {
            i--
        }
    }

    //3. 응모.당첨여부 변경
    let winnerList = []
    entryList.forEach((item, idx) => {
        if (winnerIdxList.includes(idx)) {
            //당첨으로 변경
            changeEntryStatus(item.entry_id, "prize")
            winnerList.push(item)
        } else {
            //미당첨으로 변경
            changeEntryStatus(item.entry_id, "none")
        }
    })

    //4. 추첨.상태 변경
    await changeLotteryStatus(lotteryId)

    //5. 당첨자 프로필 response
    const winnerProfileList = await Promise.all(
        winnerList.map((item) => {
            return retrieveWinnerInfo(item.group_user_id)
        })
    )

    return winnerProfileList
}