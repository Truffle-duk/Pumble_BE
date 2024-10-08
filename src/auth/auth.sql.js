export const selectEmailExist = "SELECT EXISTS(SELECT * FROM User Where email=?) as isExistEmail;";
export const insertNewUser = "INSERT INTO User (email, password, name) VALUES (?, ?, ?);";
export const selectUserByEmail = "SELECT user_id, name FROM User WHERE email=?;";
export const selectPassword = "SELECT password FROM User WHERE email=?;";
export const selectUserById = "SELECT user_id FROM User WHERE user_id=?;";