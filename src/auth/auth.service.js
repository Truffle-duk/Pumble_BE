import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {createUser, retrieveEmailExist} from "./auth.model.js";
import {smtpTransport} from "../../config/smtpConfig.js";
import crypto from "crypto"
import NodeCache from "node-cache";
const cache = new NodeCache()

export const checkEmailDuplicateService = async (body) => {
    const email = body.email
    if (!email.match(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i)) {
        throw new BaseError(status.INVALID_EMAIL)
    }

    const isDuplicate = await retrieveEmailExist(email)
    if (isDuplicate.isExistEmail === 1) {
        throw new BaseError(status.DUPLICATE_EMAIL)
    }

    return "사용 가능한 메일입니다."
}

export const sendVerificationCodeService = async (body) => {
    const email = body.email
    const code = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111

    const mailOption = {
        from: "pumble.truffle@gmail.com",
        to: email,
        subject: "[Pumble] 인증코드를 확인해주세요.",
        html: `<p>귀하의 이메일 주소를 통해 인증번호가 요청되었습니다. Pumble 인증 코드는 다음과 같습니다.</p><br><strong>${code}</strong><br><br><p>해당 코드는 10분 뒤 만료됩니다.<br>Pumble 운영팀</p>`
    }

    if (email) {
        try {
            await new Promise((resolve, reject) => {
                smtpTransport.sendMail(mailOption, (error, response) => {
                    if (error) {
                        console.log(error);
                        smtpTransport.close();
                        reject(new BaseError(status.SENDING_ERROR)); // 에러 발생 시 reject
                    } else {
                        console.log(response);
                        resolve(response); // 성공 시 resolve
                    }
                });
            });

            // 성공적으로 메일을 보냈다면 캐시에 저장
            cache.set(`Code-${email}`, code, 600);
            smtpTransport.close();
            return "인증코드가 전송되었습니다.";
        } catch (error) {
            throw new BaseError(status.SENDING_ERROR);
        }
    }
}

export const verifyEmailService = async (body) => {
    const realCode = cache.get(`Code-${body.email}`);
    if (realCode === undefined) {
        throw new BaseError(status.CODE_EXPIRE)
    } else if (body.code !== realCode) {
        cache.del(`Code-${body.email}`)
        throw new BaseError(status.CODE_NOT_MATCH)
    }
    return "이메일 인증이 완료되었습니다."
}

export const signUpService = async (body) => {
    // 혹시나 한번 더 확인
    const isDuplicate = await retrieveEmailExist(body.email)
    if (isDuplicate.isExistEmail === 1) {
        throw new BaseError(status.DUPLICATE_EMAIL)
    }

    const encodedPassword = crypto.createHash("sha512").update(body.password).digest("base64")

    const params = [body.email, encodedPassword, body.name]
    const createUserResult = await createUser(params)

    if (createUserResult && createUserResult.affectedRows === 1) {
        return {userId: createUserResult.insertId}
    } else {
        throw new BaseError(status.INTERNAL_SERVER_ERROR)
    }
}