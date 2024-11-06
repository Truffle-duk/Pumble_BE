export const insertNewNotification = "INSERT INTO Notification (type, notice_id, group_id, content) VALUES (?, ?, ?, ?);";
export const selectNotificationAll = "SELECT * FROM Notification WHERE group_id = ?;";
export const selectGroupUserTokenByGID = "SELECT U.fcmToken FROM User U Join pumble.GroupUser GU on U.user_id = GU.user_id WHERE GU.group_id = ?;";