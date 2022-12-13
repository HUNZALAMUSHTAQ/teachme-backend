import mongoose from 'mongoose'

export interface User {
    id: string;
    email: string;
    username: string;
    password: string;
    isTeacher: boolean;
    description: string;
}

export const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    description: {type: String, required: true},
    isTeacher: {type: Boolean, required: true},

})



