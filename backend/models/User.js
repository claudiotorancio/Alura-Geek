

import { Schema, model } from "mongoose";

const UsersSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: { type: Date, default: Date.now }
}, {
    versionKey: false
});

export default model('Users', UsersSchema)