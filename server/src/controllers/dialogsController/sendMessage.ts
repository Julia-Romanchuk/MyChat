import { Handler } from "express"
import { createResponse, responseStatus } from "../../helpers/ResponseCreator"
import Dialogs from "../../models/dialog"
import Users from "../../models/user"
import Messages from '../../models/message'
import { Dialog } from "../../types/models.type"

export const createDialog = async (authors: Array<string>) => {
    const dialog = await Dialogs.create({authors})
    const users = await Users.find().where({'_id': {$in: authors}})
    users.forEach((user) => { 
        user.dialogs.push(dialog._id)
        user.save() })
    return dialog
}

export const findDialog = async (dialogId: string) => {
    return await Dialogs.findById(dialogId)
}

export const addMessage = async (dialogInstance: Dialog, messageData: {text: string, author: string}) => {
    const newMessage = await Messages.create(messageData)
    dialogInstance.messages.push(newMessage)
    dialogInstance.save()
    return newMessage
}
