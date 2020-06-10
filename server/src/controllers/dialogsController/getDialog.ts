import { Handler } from "express"
import { createResponse, responseStatus } from "../../helpers/ResponseCreator"
import Dialogs from "../../models/dialog"

const GetDialog: Handler = async (req, res) => {
    const gialogId = req.params.dialogId
    const dialog = await Dialogs.findById(gialogId)
    .populate({
        path: 'messages', 
        limit: 50
    })
    .populate({path: 'authors', select: 'firstname lastname image'})
    console.log(dialog.messages[dialog.messages.length-1])

    res.status(200).json(createResponse(responseStatus.success, '', { dialog }))
}

export default GetDialog