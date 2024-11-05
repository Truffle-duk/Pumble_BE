import {status} from "../../config/responseStatus.js";
import {response} from "../../config/response.js";
import {retrieveNotificationAll} from "./notification.service.js";

export const getAllNotification = async (req, res, next) => {
    const getNewNotificationResult = await retrieveNotificationAll(req.groupId)
    if (getNewNotificationResult) {
        res.send(response(status.SUCCESS, getNewNotificationResult))
    }
}