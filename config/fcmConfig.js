import admin from 'firebase-admin';
import dotenv from 'dotenv'
import {addNewNotification, retrieveFCMToken} from "../src/notification/notification.service.js";
import firebaseKey from '../config/firebase.json' assert {type: "json"}
dotenv.config()


admin.initializeApp({
    credential: admin.credential.cert(firebaseKey),
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