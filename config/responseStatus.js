import { StatusCodes } from "http-status-codes";

export const status = {
    // success
    SUCCESS: {status: StatusCodes.OK, "isSuccess": true, "code": 200, "message": "success!"},
    // common
    NOT_FOUND: {status: StatusCodes.NOT_FOUND, "isSuccess": false, "code": 400, "message": "not found"},
    INTERNAL_SERVER_ERROR: {status: StatusCodes.INTERNAL_SERVER_ERROR, "isSuccess": false, "code": 500, "message": "요청을 처리하는 과정에서 문제가 발생했습니다. 관리자에게 문의하세요."},
    // auth
    INVALID_EMAIL: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "AUTH4001", "message": "잘못된 이메일 형식입니다."},
    DUPLICATE_EMAIL: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "AUTH4002", "message": "이미 사용중인 이메일입니다."},
    SENDING_ERROR: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "AUTH4003", "message": "이메일 전송과정에서 문제가 발생했습니다."},
    CODE_EXPIRE: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "AUTH4004", "message": "인증번호가 만료되었습니다. 이메일 인증을 다시 진행해주세요."},
    CODE_NOT_MATCH: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "AUTH4005", "message": "인증번호가 일치하지 않습니다."},

    WRONG_EXTENSION: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "TEST", "message": "잘못된 확장자입니다."},
}