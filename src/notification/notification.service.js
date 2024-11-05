import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {insertNotification, selectGroupUserToken, selectNotifications} from "./notification.model.js";

// 새로운 알림 추가
export const addNewNotification = async (type, noticeId, groupId) => {
    const params = [type, noticeId, groupId]
    const createNewNotificationResult = await insertNotification(params)

    if (createNewNotificationResult && createNewNotificationResult.affectedRows === 1) {
        return createNewNotificationResult.insertId
    } else {
        throw new BaseError(status.DB_ERROR)
    }
}

export const retrieveNotificationAll = async (groupId) => {
    const selectNotificationsResult = await selectNotifications(groupId)

    if (selectNotificationsResult) {
        return selectNotificationsResult
    } else {
        throw new BaseError(status.DB_ERROR)
    }
}

// 수신자들의 FCM 토큰 조회
export const retrieveFCMToken = async (groupId) => {
    const selectTokenResult = await selectGroupUserToken(groupId)

    if (selectTokenResult) {
        return selectTokenResult
            .filter(result => result?.fcmToken !== null)
            .map(result => result.fcmToken)
    } else {
        throw new BaseError(status.DB_ERROR)
    }
}