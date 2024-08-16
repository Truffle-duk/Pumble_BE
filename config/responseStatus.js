import { StatusCodes } from "http-status-codes";

export const status = {
    // success
    SUCCESS: {status: StatusCodes.OK, "isSuccess": true, "code": 200, "message": "success!"},
    // common
    NOT_FOUND: {status: StatusCodes.NOT_FOUND, "isSuccess": false, "code": 400, "message": "not found"},
    INTERNAL_SERVER_ERROR: {status: StatusCodes.INTERNAL_SERVER_ERROR, "isSuccess": false, "code": 500, "message": "요청을 처리하는 과정에서 문제가 발생했습니다. 관리자에게 문의하세요."},
    WRONG_PATH: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": 400, "message": "잘못된 경로입니다."},
    // auth
    INVALID_EMAIL: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "AUTH4001", "message": "잘못된 이메일 형식입니다."},
    DUPLICATE_EMAIL: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "AUTH4002", "message": "이미 사용중인 이메일입니다."},
    SENDING_ERROR: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "AUTH4003", "message": "이메일 전송과정에서 문제가 발생했습니다."},
    CODE_EXPIRE: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "AUTH4004", "message": "인증번호가 만료되었습니다. 이메일 인증을 다시 진행해주세요."},
    CODE_NOT_MATCH: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "AUTH4005", "message": "인증번호가 일치하지 않습니다."},
    USER_NOT_EXIST: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "USER4001", "message": "해당 사용자가 존재하지 않습니다."},
    WRONG_PASSWORD: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "USER4002", "message": "비밀번호가 일치하지 않습니다."},
    // file
    WRONG_EXTENSION: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "FILE4001", "message": "잘못된 확장자입니다."},
    // JWT
    TOKEN_NOT_EXIST: {status: StatusCodes.UNAUTHORIZED, "isSuccess": false, "code": "TOKEN4001", "message": "토큰이 존재하지 않습니다."},
    EXPIRED_TOKEN: {status: StatusCodes.INSUFFICIENT_SPACE_ON_RESOURCE, "isSuccess": false, "code": "TOKEN4002", "message": "만료된 토큰입니다."},
    INVALID_TOKEN: {status: StatusCodes.UNAUTHORIZED, "isSuccess": false, "code": "TOKEN4003", "message": "잘못된 접근입니다."},
}