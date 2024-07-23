export const insertNewItem = "INSERT INTO Item (name, price, category, image, type, group_id) values (?,?,?,?,?,?);";
export const select4ItemsRecent = "SELECT * FROM Item WHERE status='onsale' AND group_id=? ORDER BY created_at DESC LIMIT 4;";
export const selectItemsByCategory = "SELECT * FROM Item WHERE status='onsale' AND group_id=? AND category=? ORDER BY created_at ASC;";
export const selectItemDetails = "SELECT * FROM Item WHERE item_id=?;";
export const insertNewLotteryInfo = "INSERT INTO Lottery (draw_date, winners_num, status, item_id) values (?,?,true,?);"; //추첨 전: true
export const insertNewEntry = "INSERT INTO Entry (lottery_id, group_user_id) values (?,?);";
export const selectEntries = "SELECT * FROM Entry WHERE lottery_id=?;";
export const selectLottery = "SELECT * FROM Lottery WHERE lottery_id=?;";
export const updateEntryStatus = "UPDATE Entry SET status=? WHERE entry_id=?;";
export const updateLotteryStatus = "UPDATE Lottery SET status=0 WHERE lottery_id=?;";
export const selectGroupUser = "SELECT nickname, profile_image FROM GroupUser WHERE group_user_id=?;";