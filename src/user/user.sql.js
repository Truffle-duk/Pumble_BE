export const updateUserNameSQL = "UPDATE User SET name=? WHERE user_id=?;";
export const selectUserNameById = "SELECT name, updated_at FROM User WHERE user_id=?;";
export const selectUserById = "SELECT * FROM User WHERE user_id=?;";