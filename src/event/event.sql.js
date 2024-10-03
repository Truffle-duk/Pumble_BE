export const insertEvent = "INSERT INTO Event (title, description, scheduled_date_start, scheduled_date_end, scheduled_place, max_person, num_of_token, code, group_id) values (?,?,?,?,?,?,?,?,?);";
export const selectTargetEvent = "SELECT * from Event where event_id = ?;";
export const checkDuplicateAttendee = "SELECT EXISTS(SELECT * FROM Attendee WHERE event_Id = ? and group_user_id = ?) as isExist;";
export const insertAttendee = "INSERT INTO Attendee (event_id, group_user_id) values (?,?);";
export const updateAttendeeNum = "UPDATE Event set current_person = current_person+1 where event_id = ?;";
export const selectEventsAll = "SELECT * from Event where group_id = ?;";
export const selectMonthlyEvents = "SELECT a.event_id, a.title, a.description, a.scheduled_date_start, a.scheduled_date_end, a.scheduled_place, a.status, a.max_person, a.num_of_token, IF(b.group_user_id!='', true, false) as isAttended "
    + "FROM (SELECT * FROM Event WHERE group_id=? AND (MONTH(scheduled_date_start)=? OR MONTH(scheduled_date_end)=?)) AS a "
    + "LEFT OUTER JOIN (SELECT * FROM Attendee WHERE group_user_id=?) AS b "
    + "ON a.event_id=b.event_id;";
export const selectRecentlyEndAndUpcomingEvent = "(SELECT * FROM Event WHERE group_id=? AND status='yet' AND scheduled_date_start>now() ORDER BY scheduled_date_start ASC LIMIT 1) " +
    "UNION (SELECT * FROM Event WHERE group_id=? AND status='done' AND scheduled_date_end<now() ORDER BY scheduled_date_end DESC LIMIT 1);";
export const selectTokensByGroupUserId = "SELECT token FROM GroupUser WHERE group_user_id=?;";
export const updateAttendeeToken = "UPDATE GroupUser SET token=? WHERE group_user_id=?;";