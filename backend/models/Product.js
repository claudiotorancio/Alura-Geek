

import { Schema, model } from "mongoose";

const ProductSchema = new Schema ({
    name: {type: String},
    price: {type: String},
    imagePath: {type: String},
    section:{type: String},
    created_at: {type: Date, default: Date.now}
}, {
    versionKey:false
});

export default model('Product', ProductSchema)