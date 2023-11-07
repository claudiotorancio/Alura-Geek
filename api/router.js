import { Router } from "express";
import multer from "multer";
import AWS from 'aws-sdk'
import multerS3 from 'multer-s3'
import createProduct from "./createProduct.js";
import renderProducts from "./renderProducts.js";
import deleteProduct from "./deleteProduct.js";
import detailsProduct from "./detailsProduct.js";
import updateProduct from "./updateProduct.js";
import path from 'path';

const s3 = new AWS.S3({
    region: process.env.S3_BUCKET_REGION,
    credentials: {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID
    }
})

const upload = () =>
    multer({
        storage: multerS3({
            s3,
            bucket: process.env.BUCKET_AWS,
            contentType: multerS3.AUTO_CONTENT_TYPE,
            acl: 'public-read',
            metadata(req, file, cb) {
                cb(null, { fieldName: file.fieldname })
            },
            key(req, file, cb) {
                cb(null, Date.now().toString() + path.extname(file.originalname))
            }
        })
    })

const uploadSingle = upload(process.env.BUCKET_AWS).single('image');
const uploadSingleUpdate = upload(process.env.BUCKET_AWS).single('imagePath');

const router = Router()

router.get('/api/renderProducts', renderProducts)
router.post('/api/createProduct', uploadSingle, createProduct)
router.delete('/api/deleteProduct/:id', deleteProduct)
router.get('/api/detailsProduct/:id', detailsProduct)
router.put('/api/updateProduct/:id', uploadSingleUpdate, updateProduct)




export default router