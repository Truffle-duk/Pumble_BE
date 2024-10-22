export const deleteGroupUser = 'UPDATE GroupUser SET status = ? WHERE group_user_id = ?;';
export const selectImageUrl = 'SELECT profile_image FROM GroupUser WHERE group_user_id = ?;';
export const updateGroupUserImage = 'UPDATE GroupUser SET profile_image = ? WHERE group_user_id = ?;';
export const updateGroupUserNickname = 'UPDATE GroupUser SET nickname = ? WHERE group_user_id = ?;';
export const selectGroupUserNameAndImage = 'SELECT nickname, profile_image FROM GroupUser WHERE group_user_id;';