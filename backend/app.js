import express, { json, urlencoded } from "express";
import { fileURLToPath } from 'url';
import path from 'path';
import morgan from "morgan";
import cors from 'cors';
/*import AWS from 'aws-sdk'
import multer from "multer";
import multerS3 from 'multer-s3'*/
import router from "../api/router.js";


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.join(__dirname, 'public')

/*const s3 = new AWS.S3 ({
    region: process.env.S3_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCES_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCES_KEY,
    }
})
const upload = () => 
multer({
    storage: multerS3({
        s3,
        bucket: process.env.BUCKET_AWS,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname })
            },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + path.extname(file.originalname))
            }
    })
})

export const uploadSingle = upload("picture-upload-alura").single('image');
export const uploadSingleUpdate = upload("picture-upload-alura").single('imagePath')*/

/*uploadSingle(req, res, (err) => {
    if(err)
    return res.status(400),json({ success: false, message: err.message});
console.log(req.files);
res.status(200).json({data: req.files})
})*/

//middlewares
app.use(morgan('dev'));
app.use(urlencoded({ extended: false }))
app.use(json())
app.use(cors())



app.use('/', router)
app.use(express.static(outputPath))


export default app
