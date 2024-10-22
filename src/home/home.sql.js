export const insertNewGroup = "INSERT INTO `Group` (name, password, invite_code) VALUES (?, ?, ?);";
export const selectGroupCode = "SELECT EXISTS(SELECT * FROM `Group` WHERE invite_code = ?) AS isExist;";
export const insertNewGroupUser = "INSERT INTO GroupUser (nickname, user_id, group_id) VALUES (?, ?, ?);";
export const selectGroupInfoByUserId = "SELECT g.group_id, g.name FROM GroupUser AS gu JOIN `Group` AS g ON gu.group_id = g.group_id WHERE user_id = ?;";
export const selectGroupByCode = "SELECT * FROM `Group` WHERE invite_code = ?;";
export const insertNewGroupOwner = "INSERT INTO GroupUser (nickname, role, user_id, group_id) VALUES (?, ?, ?, ?);";