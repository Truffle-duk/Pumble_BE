export const selectEmailExist = "SELECT EXISTS(SELECT * FROM User Where email=?) as isExistEmail;";
export const insertNewUser = "INSERT INTO User (email, password, name) VALUES (?, ?, ?);";
export const selectUser = "SELECT user_id FROM User WHERE email=?;";
export const selectPassword = "SELECT password FROM User WHERE email=?;";