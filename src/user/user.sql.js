export const updateUserNameSQL = "UPDATE User SET name=? WHERE user_id=?;";
export const selectUserNameById = "SELECT name, updated_at FROM User WHERE user_id=?;";
export const selectUserById = "SELECT * FROM User WHERE user_id=?;";
export const deactiveUserById = "UPDATE User SET status = 'deactive', deleted_at = ? WHERE user_id = ?;";
export const selectMyGroupById = "SELECT g.group_id, g.name, gu.role FROM GroupUser gu JOIN `Group` g ON gu.group_id = g.group_id WHERE gu.user_id = ?;";