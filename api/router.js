import { Router, json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import multer from "multer";
import AWS from "aws-sdk";
import multerS3 from "multer-s3";
import passport from "../backend/lib/passport.js";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
import MONGODB_URI from "../backend/config.js";
import signin from "../backend/routes/user/signin.js";
import signup from "../backend/routes/user/signup.js";
import logout from "../backend/routes/user/logout.js";
import renderInicio from "../backend/routes/Prduct/renderInicio.js";
import renderProducts from "../backend/routes/Prduct/renderProducts.js";
import createProduct from "../backend/routes/Prduct/createProduct.js";
import deleteProduct from "../backend/routes/Prduct/deleteProduct.js";
import detailsProduct from "../backend/routes/Prduct/detailsProduct.js";
import updateProduct from "../backend/routes/Prduct/updateProduct.js";
import listaAdmin from "../backend/routes/lista/lista.Admin.js";
import deleteUser from "../backend/routes/lista/deleteUser.js";
import contadorProductos from "../backend/routes/lista/contadorProductos.js";
import updateUser from "../backend/routes/lista/updateUser.js";
import path from "path";

const router = Router();

router.use(cookieParser());
router.use(urlencoded({ extended: false }));
router.use(json());

// Configuración de sesión

router.use(
  session({
    key: "user_sid",
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore(session)({
      uri: MONGODB_URI,
      collection: "mySessions",
    }),
    cookie: {
      expires: 600000,
    },
  })
);
router.use(passport.initialize());
router.use(passport.session());

// Configuración de Multer
const s3 = new AWS.S3({
  region: process.env.S3_BUCKET_REGION,
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  },
});

const upload = () =>
  multer({
    storage: multerS3({
      s3,
      bucket: process.env.BUCKET_AWS,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      acl: "public-read",
      metadata(req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key(req, file, cb) {
        cb(null, Date.now().toString() + path.extname(file.originalname));
      },
    }),
  });

export const uploadSingle = upload(process.env.BUCKET_AWS).single("image");
const uploadSingleUpdate = upload(process.env.BUCKET_AWS).single("imagePath");

// Rutas
router.post("/api/signup", signup);
router.post("/api/signin", signin);
router.delete("/api/logout", logout);
router.get('/api/renderLista', listaAdmin)
router.delete('/api/deleteUser/:id', deleteUser)
router.put('/api/updateUser/:id', updateUser)
router.get('/api/contadorProductos/:id', contadorProductos)
router.get("/api/renderInicio", renderInicio);
router.get("/api/renderProducts", renderProducts);
router.post("/api/createProduct", createProduct);
router.delete("/api/deleteProduct/:id", deleteProduct);
router.get("/api/detailsProduct/:id", detailsProduct);
router.put("/api/updateProduct/:id", uploadSingleUpdate, updateProduct);

export default router;
