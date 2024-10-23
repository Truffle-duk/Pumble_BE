export const insertNewItem = "INSERT INTO Item (name, price, category, image, group_id) values (?,?,?,?,?);";
export const select4ItemsRecent = "SELECT * FROM Item WHERE status='onsale' AND group_id=? ORDER BY created_at DESC LIMIT 4;";
export const selectItemsByCategory = "SELECT * FROM Item WHERE status='onsale' AND group_id=? AND category=? ORDER BY created_at;";
export const selectItemDetails = "SELECT * FROM Item WHERE group_id=? and item_id=?;";
export const updateGroupUser = "UPDATE GroupUser SET goods_count = goods_count + 1, token = token - ? WHERE group_user_id = ?;";
export const selectToken = "SELECT token FROM GroupUser WHERE group_user_id = ?;";