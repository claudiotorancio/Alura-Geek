import { Router } from "express";
import multer from "multer";
import AWS from 'aws-sdk'
import multerS3 from 'multer-s3'
import createProduct from "../backend/routes/Prduct/createProduct.js";
import renderProducts from "../backend/routes/Prduct/renderProducts.js";
import deleteProduct from "../backend/routes/Prduct/deleteProduct.js";
import detailsProduct from "../backend/routes/Prduct/detailsProduct.js";
import updateProduct from "../backend/routes/Prduct/updateProduct.js";
import path from 'path';
import signin from "../backend/routes/user/signin.js";
import signup from "../backend/routes/user/signup.js";
import success from "../backend/routes/user/success.js";
import logout from "../backend/routes/user/logout.js";
import passport from "../backend/lib/passport.js"
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
import MONGODB_URI from "../backend/config.js";


//middlewares
const sessionMiddleware =
    session({
        key: "user_sid",
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        store: new MongoDBStore(session)({
            uri: MONGODB_URI,
            collection: 'mySessions',
        }),
        cookie: {
            expires: 600000
        }
    })

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

//defino enrutador

const router = Router()

//Login

router.post('/api/signup', signup)
router.post('/api/signin',sessionMiddleware, passport.authenticate('local.signin', { session: true }), signin)
router.delete('/api/logout',sessionMiddleware, passport.authenticate('session'), logout)

router.get('/success', success)


//Products
router.get('/api/renderProducts', sessionMiddleware, passport.authenticate('session'),  renderProducts)
router.post('/api/createProduct',  uploadSingle,  sessionMiddleware, passport.authenticate('session'),  createProduct)
router.delete('/api/deleteProduct/:id', deleteProduct)
router.get('/api/detailsProduct/:id', detailsProduct)
router.put('/api/updateProduct/:id', uploadSingleUpdate, updateProduct)

export default router