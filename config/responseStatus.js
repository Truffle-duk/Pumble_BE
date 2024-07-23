import { StatusCodes } from "http-status-codes";

export const status = {
    // success
    SUCCESS: {status: StatusCodes.OK, "isSuccess": true, "code": 200, "message": "success!"},
    NOT_FOUND: {status: StatusCodes.NOT_FOUND, "isSuccess": false, "code": 400, "message": "not found"},
    DB_ERROR: {status: StatusCodes.INTERNAL_SERVER_ERROR, "isSuccess": false, "code": 500, "message": "서버 내부 에러. 관리자에게 문의하세요."},
}