import multer from 'multer'
import multerS3 from 'multer-s3'
import {v4} from 'uuid'
import path from 'path'
import dotenv from 'dotenv'
import {BaseError} from "../../config/error.js";
import {status} from "../../config/responseStatus.js";
import {DeleteObjectCommand, S3Client} from "@aws-sdk/client-s3";

dotenv.config();    // .env 파일 사용

const s3 = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY,
        secretAccessKey: process.env.AWS_S3_SECRET_KEY
    }
})

// 확장자 검사 목록
const allowedExtensions =  ['.png', '.jpg', '.jpeg', '.bmp', '.gif']

const createUUID = () => {
    const tokens = v4().split('-')
    console.log("token", tokens)
    return tokens[2] + tokens[1] + tokens[0] + tokens[3] + tokens[4]
}

export const imageUploader = multer({
    storage: multerS3({
        s3: s3,   // S3 객체
        bucket: process.env.AWS_S3_BUCKET_NAME,   // Bucket 이름
        contentType: multerS3.AUTO_CONTENT_TYPE,  // Content-type, 자동으로 찾도록 설정
        key: (req, file, callback) => {           // 파일명
            const uploadDirectory = req.path.split('/')[2]
            const extension = path.extname(file.originalname) // 파일 이름 얻기
            const uuid = createUUID()
            // extension 확인을 위한 코드 (확장자 검사용)
            if(!allowedExtensions.includes(extension)){
                return callback(new BaseError(status.WRONG_EXTENSION))
            }

            const filename = `${uploadDirectory}/${uuid}${extension}`
            callback(null, filename)

            req.s3ObjectUrl = getImageURL(uploadDirectory, filename)
        },
        acl: 'public-read-write'  // 파일 액세스 권한
    }),
    // 이미지 용량 제한 (5MB)
    limits: { fileSize: 5 * 1024 * 1024},
})

export const imageDeleter = async (key) => {
    const deleteObjectCommand = new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key
    })

    await s3.send(deleteObjectCommand)
}

export const getImageURL = (directory, filename) => {
    const bucket = process.env.AWS_S3_BUCKET_NAME
    const region = process.env.AWS_S3_REGION
    return `https://${bucket}.s3.${region}.amazonaws.com/${filename}`
}

// 함수 내 사용 시
export const uploadImage = (req, res) => {
    return new Promise((resolve, reject) => {
        imageUploader.single('image')(req, res, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(req.s3ObjectUrl);
            }
        });
    });
};