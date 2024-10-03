export const insertNewPost = "INSERT INTO Post (group_id, group_user_id, title, content, type) values (?, ?, ?, ?, 'normal');";
export const deletePost = "DELETE FROM Post WHERE post_id = ?;";
export const selectPostByPostId = "SELECT p.*, g.profile_image, g.nickname, g.role FROM Post as p JOIN GroupUser as g ON p.group_user_id = g.group_user_id WHERE post_id = ?;";
export const insertNewComment = "INSERT INTO Comment (post_id, group_user_id, content) values (?, ?, ?);";
export const deleteComment = "DELETE FROM Comment WHERE comment_id = ?;";
export const selectCommentByCommentId = "SELECT * FROM Comment WHERE comment_id = ?;";
export const selectCommentByPostId = "SELECT c.group_user_id, c.comment_id, c.content, c.created_at, g.nickname, g.profile_image FROM Comment as c JOIN GroupUser as g ON c.group_user_id = g.group_user_id WHERE c.post_id = ?;";
export const insertNewNotice = "INSERT INTO Post (group_id, group_user_id, title, content, type) values (?, ?, ?, ?, 'notice');";
export const selectPostList = "SELECT p.post_id, p.title, p.content, p.created_at, COUNT(c.comment_id) as comment_count FROM Post as p LEFT JOIN Comment as c ON p.post_id = c.post_id WHERE p.group_id = ? and p.type = 'normal' GROUP BY p.post_id, p.title, p.content, p.created_at ORDER BY p.created_at DESC LIMIT ?, 10;";
export const selectNoticeList = "SELECT p.post_id, p.title, p.created_at, g.nickname, g.group_user_id FROM Post as p JOIN GroupUser as g ON p.group_user_id = g.group_user_id WHERE p.group_id = ? and p.type = 'notice' ORDER BY p.created_at DESC LIMIT ?, 10;";
export const selectPostCount = "SELECT COUNT(*) as post_count FROM Post WHERE group_id = ? and type = 'normal';";
export const selectNoticeCount = "SELECT COUNT(*) as notice_count FROM Post WHERE group_id = ? and type = 'notice';";