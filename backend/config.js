import { config } from "dotenv";

try{
    if(process.env.NODE_ENV !== 'production') {
        config()
    }
    } catch (error) {
        console.error('Error al cargar las variables de entorno')
    } 

    const MONGODB_URI = process.env.MONGODB_URI

    export default MONGODB_URI