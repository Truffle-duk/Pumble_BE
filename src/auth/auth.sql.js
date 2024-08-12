export const selectEmailExist = "SELECT EXISTS(SELECT * FROM User Where email=?) as isExistEmail;";
export const insertNewUser = "INSERT INTO User (email, password, name) VALUES (?, ?, ?);";