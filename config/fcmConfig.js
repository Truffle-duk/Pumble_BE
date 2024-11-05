import admin from 'firebase-admin';
import dotenv from 'dotenv'
import {addNewNotification, retrieveFCMToken} from "../src/notification/notification.service.js";
dotenv.config()

const serviceAccountKey = process.env.GOOGLE_APPLICATION_CREDENTIALS
;

admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey),
});

export async function sendPushNotification(title, body, data) {
    const tokens = await retrieveFCMToken(Number(data.groupId))
    const message = {
        tokens: tokens,
        notification: {
            title: title,
            body: body,
        },
        data: data
    };

    await admin.messaging().sendEachForMulticast(message)
        .then(_ => {

            let noticeId
            if (data.type === 'notice') {
                noticeId = data.id
            } else if (data.type === 'receipt') {
                noticeId = null
            }

            addNewNotification(data.type, noticeId, Number(data.groupId))
                .then(_ => {
                    console.log('Successfully add notification')
                })
            console.log('Successfully sent notifee');
        })
        .catch(error => {
            console.error('Error sending message:', error);
        });
}

// 예시: FCM 토큰과 알림 내용을 넣어 호출
//sendPushNotification(fcmToken, '알림 제목', '알림 내용');