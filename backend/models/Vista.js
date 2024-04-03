//modelo para productos

import { Schema, model } from "mongoose";

const VistaSchema = new Schema ({
    role: {type: String},
    name: {type: String},
    imagePath: {type: String},
    section:{type: String},
    created_at: {type: Date, default: Date.now}
}, {
    versionKey:false
});

export default model('Vista', VistaSchema)