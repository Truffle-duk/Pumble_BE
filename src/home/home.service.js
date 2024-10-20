import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {
    createGroup,
    createNewGroupOwner,
    findDuplicateCode,
    findGroupByCode,
    findJoinedGroups,
    joinGroup
} from "./home.model.js";
import crypto from "crypto"

const randomCodeGenerator = async () => {
    const randomCode = Math.random().toString(16).substring(2, 10);
    const isCodeDuplicate = await findDuplicateCode(randomCode)
    if (isCodeDuplicate.isExist) {
        return randomCodeGenerator()
    } else {
        return randomCode
    }
}

export const createNewGroupService = async (userId, body) => {
    // 1. 중복되지 않는 초대코드 생성
    const randomCode = await randomCodeGenerator()

    // 2. 비밀번호 암호화
    const encodedPassword = crypto.createHash("sha512").update(body.password).digest("base64")

    // 3. 새로운 모임 생성
    const params = [body.name, encodedPassword, randomCode]
    const createNewGroupResult = await createGroup(params)

    if (createNewGroupResult && createNewGroupResult.affectedRows === 1) {
        // 4. 성공적으로 그룹 생성 -> 생성한 사람을 리더로 추가
        const newOwnerParams = [body.name, 'leader', userId, createNewGroupResult.insertId]
        const createNewGroupOwnerResult = await createNewGroupOwner(newOwnerParams)

        if (createNewGroupOwnerResult && createNewGroupOwnerResult.affectedRows === 1) {
            return {newGroupId: createNewGroupResult.insertId, newLeaderId: createNewGroupOwnerResult.insertId}
        } else {
            throw new BaseError(status.INTERNAL_SERVER_ERROR)
        }

    } else {
        throw new BaseError(status.INTERNAL_SERVER_ERROR)
    }
}

export const joinGroupService = async (username, userId, body) => {
    const group = await findGroupByCode(body.code)

    if (group) {
        const params = [username, userId, group.group_id]
        const joinGroupResult = await joinGroup(params)

        if (joinGroupResult && joinGroupResult.affectedRows === 1) {
            return {groupId: group.group_id, newGroupUserId: joinGroupResult.insertId}
        } else {
            throw new BaseError(status.INTERNAL_SERVER_ERROR)
        }

    } else {
        throw new BaseError(status.GROUP_NOT_EXIST)
    }
}

export const retrieveJoinedGroupsService = async (userId) => {
    const retrieveJoinedGroupResult = await findJoinedGroups(userId)

    if (retrieveJoinedGroupResult) {
        return retrieveJoinedGroupResult[0]
    } else {
        throw new BaseError(status.INTERNAL_SERVER_ERROR)
    }
}