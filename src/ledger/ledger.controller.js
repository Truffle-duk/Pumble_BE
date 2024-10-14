import {response} from "../../config/response.js";
import {status} from "../../config/responseStatus.js";
import {addNewReceiptService} from "./ledger.service.js";
import {BaseError} from "../../config/error.js";

export const addNewReceipt = async (req, res, next) => {
    if (req.groupUserRole === 'member') {
        throw new BaseError(status.NO_AUTHORITY)
    }

    const addNewReceiptResult = await addNewReceiptService(req.groupId, req.body, req.s3ObjectUrl)
    if (addNewReceiptResult && addNewReceiptResult === 1) {
        res.send(response(status.SUCCESS, { receiptUrl: req.s3ObjectUrl }))
    }
}