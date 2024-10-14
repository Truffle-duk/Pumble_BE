import { StatusCodes } from "http-status-codes";

export const status = {
    //name: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": 400, "message": ""},
    // success
    SUCCESS: {status: StatusCodes.OK, "isSuccess": true, "code": 200, "message": "success!"},
    DB_ERROR: {status: StatusCodes.INTERNAL_SERVER_ERROR, "isSuccess": false, "code": 500, "message": "서버 내부 에러. 관리자에게 문의하세요."},
    ACCESS_DENIED: {status: StatusCodes.FORBIDDEN, "isSuccess": false, "code": 403, "message": "권한이 없습니다."},
    //event
    WRONG_CODE: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": 400, "message": "코드가 틀렸습니다."},
    EVENT_JOIN_UNABLE: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": 400, "message": "정원이 가득 찼습니다."},
    ALREADY_ATTEND: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": 400, "message": "이미 참여한 구성원입니다."},
    // common
    NOT_FOUND: {status: StatusCodes.NOT_FOUND, "isSuccess": false, "code": 400, "message": "not found"},
    INTERNAL_SERVER_ERROR: {status: StatusCodes.INTERNAL_SERVER_ERROR, "isSuccess": false, "code": 500, "message": "요청을 처리하는 과정에서 문제가 발생했습니다. 관리자에게 문의하세요."},
    WRONG_PATH: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": 400, "message": "잘못된 경로입니다."},
    FORBIDDEN: {status: StatusCodes.FORBIDDEN, "isSuccess": false, "code": 403, "message": "권한이 없습니다."},
    LACK_OF_INFO: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": 400, "message": "정보가 부족합니다."},
    NO_AUTHORITY: {status: StatusCodes.UNAUTHORIZED, "isSuccess": false, "code": 400, "message": "상급 권한이 필요합니다."},
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
    AUTHORIZATION_NOT_EXIST: {status: StatusCodes.UNAUTHORIZED, "isSuccess": false, "code": "TOKEN4011", "message": "토큰이 존재하지 않습니다."},
    TOKEN_NOT_EXIST: {status: StatusCodes.UNAUTHORIZED, "isSuccess": false, "code": "TOKEN4012", "message": "토큰이 존재하지 않습니다."},
    EXPIRED_TOKEN: {status: StatusCodes.UNAUTHORIZED, "isSuccess": false, "code": "TOKEN4014", "message": "만료된 토큰입니다."},
    INVALID_TOKEN: {status: StatusCodes.UNAUTHORIZED, "isSuccess": false, "code": "TOKEN4013", "message": "잘못된 접근입니다."},
    // community
    NOT_AUTHOR: {status: StatusCodes.UNAUTHORIZED, "isSuccess": false, "code": "COMMUNITY4011", "message": "글 작성자가 아닙니다."},
    POST_NOT_EXIST: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "COMMUNITY4001", "message": "해당 글이 존재하지 않습니다."},
    COMMENT_NOT_EXIST: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "COMMUNITY4002", "message": "해당 댓글이 존재하지 않습니다."},
    WRONG_REQUEST_TYPE: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "COMMUNITY4003", "message": "잘못된 요청입니다. 글의 타입을 확인해보세요."},
    PAGE_OUT_OF_RANGE: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "COMMUNITY4004", "message": "최대 페이지를 넘었습니다."},
    // home
    GROUP_NOT_EXIST: {status: StatusCodes.BAD_REQUEST, "isSuccess": false, "code": "HOME4001", "message": "잘못된 초대 코드입니다."},
}