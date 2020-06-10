import { UserItem } from "./profileReduser.type";

export type MessageItem = {
    text: string
    author: string
    _id: string
    createdAt: string
} 

export type DialogListItem = {
    authors: Array<UserItem>
    messages: Array<string>
    _id: string
}

export type InitialStateType = {
    dialogs: null | Array<DialogListItem>
    dialog: Dialog ,
}

export type Dialog = {
    messages: Array<MessageItem> 
    authors: Array<UserItem>
}