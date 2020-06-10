import { Schema, model } from 'mongoose'
import {User} from '../types/models.type'

const User = new Schema<User>({
    username: {type: String, required: true, max: 15, min: 3},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    password: {type: String, required: true, min: 8, trim: true},
    birthDate: Date,
    status: String,
    aboutMe: String,
    image: String,
    contacts: {
        mobile: Number,
        email: { type: String, required: true},
        website: String
    },
    address: {
        country: String,
        city: String
    },
    blackList: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    bestFriends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followed: {type: Boolean, default: false},
    dialogs: [{type: Schema.Types.ObjectId, ref: 'Dialog'}],
    dialogId: {type: Schema.Types.ObjectId, ref: 'Dialog'}
})

const Users = model<User>('User', User)

export default Users