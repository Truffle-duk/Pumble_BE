import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {createNewReceipt} from "./ledger.model.js";
import {sendPushNotification} from "../../config/fcmConfig.js";
import {addNewNotification} from "../notification/notification.service.js";

export const addNewReceiptService = async (groupId, body, url) => {
    const params = [groupId, body.date, url]
    const createNewReceiptResult = await createNewReceipt(params)

    if (createNewReceiptResult && createNewReceiptResult.affectedRows === 1) {
        await sendPushNotification('🧾새로운 영수증이 등록됐어요!', `${body.date} 거래 내역을 확인해보세요.`, { type: 'receipt', id: '', groupId: groupId.toString() })
        await addNewNotification('receipt', null, groupId, body.date)
        return 1
    } else {
        throw new BaseError(status.DB_ERROR)
    }
}