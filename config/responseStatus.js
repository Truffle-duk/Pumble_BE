import { StatusCodes } from "http-status-codes";

export const status = {
    //name: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": 400, "message": ""},
    // success
    SUCCESS: {status: StatusCodes.OK, "isSuccess": true, "code": 200, "message": "success!"},
    NOT_FOUND: {status: StatusCodes.NOT_FOUND, "isSuccess": false, "code": 400, "message": "not found"},
    DB_ERROR: {status: StatusCodes.INTERNAL_SERVER_ERROR, "isSuccess": false, "code": 500, "message": "서버 내부 에러. 관리자에게 문의하세요."},
    ACCESS_DENIED: {status: StatusCodes.FORBIDDEN, "isSuccess": false, "code": 403, "message": "권한이 없습니다."},

    //event
    WRONG_CODE: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": 400, "message": "코드가 틀렸습니다."},
    EVENT_JOIN_UNABLE: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": 400, "message": "정원이 가득 찼습니다."},
    ALREADY_ATTEND: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": 400, "message": "이미 참여한 구성원입니다."},
}