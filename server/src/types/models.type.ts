import { Document } from "mongoose";

export interface User extends Document {
    username: string
    firstname: string
    lastname: string
    password: string
    status: string
    birthDate: Date
    aboutMe: string
    image: string
    contacts: {
        mobile: number
        email: string
        website: string
    }
    address: {
        country: string
        city: string
    },
    blackList: Array<string>
    bestFriends: Array<string>
    followed?: boolean
    dialogs: Array<string>
    dialogId: string
}

export interface Dialog extends Document {
    messages: Array<Message>
    speakers: Array<string>
}

export interface Message extends Document {
    text: string
    author: string
}