export const eventResponseDTO = (eventsList) => {
    const responseArr = [];
    for (let i = 0; i < eventsList.length; i++) {
        responseArr.push({
            eventId: eventsList[i].event_id,
            title: eventsList[i].title,
            description: eventsList[i].description,
            startDate: eventsList[i].scheduled_date_start,
            endDate: eventsList[i].scheduled_date_end,
            place: eventsList[i].scheduled_place,
            status: eventsList[i].status,

        });
    }
    return {events: responseArr};
}

export const monthlyEventResponseDTO = (eventsList) => {
    const responseArr = [];
    for (let i = 0; i < eventsList.length; i++) {
        responseArr.push({
            eventId: eventsList[i].event_id,
            title: eventsList[i].title,
            description: eventsList[i].description,
            startDate: eventsList[i].scheduled_date_start,
            endDate: eventsList[i].scheduled_date_end,
            place: eventsList[i].scheduled_place,
            status: eventsList[i].status,
            maxPeople: eventsList[i].max_person,
            reward: eventsList[i].num_of_token,
            isAttended: eventsList[i].isAttended
        });
    }
    return {count: eventsList.length, events: responseArr};
}

export const lastAndNextResponseDTO = (eventsList) => {
    const dayMilliSecond = 1000 * 60 * 60 * 24
    const responseArr = [];
    for (let i = 0; i < eventsList.length; i++) {
        let D_Day
        if (eventsList[i].status === 'yet') {
            const calculateTime = eventsList[i].scheduled_date_start.getTime() - new Date().getTime()
            D_Day = `D-${Math.ceil(calculateTime/dayMilliSecond)}`
        } else {
            const calculateTime = new Date().getTime() - eventsList[i].scheduled_date_end.getTime()
            D_Day = `D+${Math.floor(calculateTime / dayMilliSecond)}`
        }
        responseArr.push({
            eventId: eventsList[i].event_id,
            title: eventsList[i].title,
            DDay: D_Day
        });
    }
    return {events: responseArr};
}