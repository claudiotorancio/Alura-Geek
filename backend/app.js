import express, { json, urlencoded } from "express";
import { fileURLToPath } from 'url';
import path from 'path';
import morgan from "morgan";
import cors from 'cors';
import exphbs from 'express-handlebars'
import passport from "passport";
import cookieParser from "cookie-parser";

import indexRouter from "../api/router.js";
/*import authRouter from "../api/authentication.js"*/


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.join(__dirname, 'public')

//middlewares
app.use(morgan('dev'));
app.use(cookieParser())
app.use(urlencoded({ extended: false }))
app.use(json())
app.use(cors())

//passport
app.use(passport.initialize());
app.use('/', indexRouter)
app.use(passport.session());

app.engine('.html', exphbs.engine({
  extname: '.html'
}));
app.set('view engine', '.html');

indexRouter.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});



/*app.use('/', authRouter)*/


app.use(express.static(outputPath))



export default app
