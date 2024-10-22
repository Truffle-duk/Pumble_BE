export const deleteGroupUser = 'UPDATE GroupUser SET status = ? WHERE group_user_id = ?;';
export const selectImageUrl = 'SELECT profile_image FROM GroupUser WHERE group_user_id = ?;';
export const updateGroupUserImage = 'UPDATE GroupUser SET profile_image = ? WHERE group_user_id = ?;';
export const updateGroupUserNickname = 'UPDATE GroupUser SET nickname = ? WHERE group_user_id = ?;';
export const selectGroupUserNameAndImage = 'SELECT nickname, profile_image FROM GroupUser WHERE group_user_id;';

export const selectAllGroupUser = "SELECT * FROM GroupUser WHERE group_id = ? and status = 'normal';";
export const updateGroupUserStatus = "UPDATE GroupUser SET status = 'kicked' WHERE group_user_id = ?;";
export const updateGroupUserRoleToStaff = "UPDATE GroupUser SET role = 'staff' WHERE group_user_id = ?;";
export const updateGroupUserRoleToMember = "UPDATE GroupUser SET role = 'member' WHERE group_user_id = ?;";
export const updateGroupUserRoleToLeader = "UPDATE GroupUser SET role = 'leader' WHERE group_user_id = ?;";
export const selectGroupPassword = "SELECT password FROM `Group` WHERE group_id=?;";
export const deleteGroup = "DELETE FROM `Group` WHERE group_id = ?;";
export const updateGroupPassword = "UPDATE `GROUP` SET password = ? WHERE group_id = ?;";
