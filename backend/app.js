import express, { json, urlencoded } from "express";
import { fileURLToPath } from 'url';
import path from 'path';
import morgan from "morgan";
import cors from 'cors';
import exphbs from 'express-handlebars';
import cookieParser from "cookie-parser";
import multer from "multer";
import AWS from 'aws-sdk';
import multerS3 from 'multer-s3';
import passport from "passport";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
import MONGODB_URI from "../backend/config.js";
import indexRouter from "../api/router.js";


const app = express();

// Ruta hacia carpeta 'public'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.join(__dirname, 'public');

// Middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors());

// Passport y sesión

app.use(session({
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
}));
app.use(passport.initialize());
app.use(passport.session());

// Multer
const s3 = new AWS.S3({
    region: process.env.S3_BUCKET_REGION,
    credentials: {
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID
    }
});

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

export const uploadSingle = upload(process.env.BUCKET_AWS).single('image');
export const uploadSingleUpdate = upload(process.env.BUCKET_AWS).single('imagePath');


// Rutas
app.use('/', indexRouter)

// Archivos estáticos
app.use(express.static(outputPath));




export default app;
