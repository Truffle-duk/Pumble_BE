import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {createNewReceipt} from "./ledger.model.js";

export const addNewReceiptService = async (groupId, body, url) => {
    console.log(body.date)
    const params = [groupId, body.date, url]
    const createNewReceiptResult = await createNewReceipt(params)

    if (createNewReceiptResult && createNewReceiptResult.affectedRows === 1) {
        return 1
    } else {
        throw new BaseError(status.DB_ERROR)
    }
}