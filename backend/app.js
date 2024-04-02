import express from "express";
import { fileURLToPath } from 'url';
import path from 'path';
import morgan from "morgan";
import indexRouter from "../api/router.js";


const app = express();

//router
// Ruta hacia carpeta 'public'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.join(__dirname, 'public')


//middlewares
app.use(morgan('dev'));

//passport

app.use('/', indexRouter)

//manejo de errores
indexRouter.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

/*app.use('/', authRouter)*/


//Archivos estaticos
app.use(express.static(outputPath))


export default app
