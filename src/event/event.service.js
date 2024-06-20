import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {
    addAttendee,
    addEvent,
    checkAttendeeExist,
    retrieveAllEvents, retrieveMonthlyEvents, retrieveRecentlyEndedAndUpcoming, retrieveTargetEvent
} from "./event.model.js";
import {eventResponseDTO, lastAndNextResponseDTO, monthlyEventResponseDTO} from "./event.dto.js";
import {ethers} from "ethers";
import dotenv from "dotenv";

dotenv.config()

//관리자 페이지 구현 시 삭제
const provider = new ethers.JsonRpcProvider('http://127.0.0.1:7545')
const privateKey = process.env.MY_PRIVATE_KEY;
const wallet = new ethers.Wallet(privateKey, provider)
const eventContractAddress = process.env.EVENT_CONTRACT_ADDRESS
const eventContractABI = ["function createEvent(uint256 _eventId, uint256 _maxPpl, uint256 _reward)"]
const eventContract = new ethers.Contract(eventContractAddress, eventContractABI, wallet)

const createEventBlockchain = async (eventId, maxPeople, reward) => {
    try {
        const txResponse = await eventContract.createEvent(eventId, maxPeople, reward)
        console.log(`Transaction hash: ${txResponse.hash}`);

        // 트랜잭션 영수증 대기
        const receipt = await txResponse.wait();
        console.log(`Transaction confirmed in block: ${receipt.blockNumber}`);
        console.log(receipt)
    } catch (e) {
        console.log(e)
        console.log('error here')
    }
}


export const createEvent = async (body) => {
    const params = [
        body.title,
        body.description,
        body.startDate,
        body.endDate,
        body.place,
        body.maxPeople,
        body.reward,
        body.code,
        body.groupId
    ]

    const insertNewEventResult = await addEvent(params)

    await createEventBlockchain(insertNewEventResult, body.maxPeople, body.reward)

    return {eventId: insertNewEventResult}
}

export const joinEvent = async (eventId, body) => {
    //비교할 이벤트 가져오기
    const targetEvent = await retrieveTargetEvent(eventId)

    //중복 참여 확인
    const checkDuplicate = await checkAttendeeExist(eventId, body.groupUserId)
    if (checkDuplicate === 1) {
        throw new BaseError(status.ALREADY_ATTEND)
    }

    //유효성 검사(선착순, 코드 일치 확인)
    if (targetEvent.max_person === targetEvent.current_person) {
        throw new BaseError(status.EVENT_JOIN_UNABLE)
    } else if (targetEvent.code !== body.code) {
        throw new BaseError(status.WRONG_CODE)
    }

    //참여 신청
    const insertNewAttendee = await addAttendee(eventId, body.groupUserId)

    return {attendeeId: insertNewAttendee}
}

export const getAllEvents = async (groupId) => {
    const getAllEventsResult = await retrieveAllEvents(groupId)

    return eventResponseDTO(getAllEventsResult)
}

export const getMonthlyEvents = async (body) => {
    const month = new Date().getMonth()+1
    const getMonthlyEventsResult = await retrieveMonthlyEvents(body, month)

    return monthlyEventResponseDTO(getMonthlyEventsResult)
}

export const getRecentlyEndAndUpcoming = async (body) => {
    const getRecentlyEndedEvent = await retrieveRecentlyEndedAndUpcoming(body)

    return lastAndNextResponseDTO(getRecentlyEndedEvent)
}