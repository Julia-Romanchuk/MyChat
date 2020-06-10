import { Handler } from "express";
import Users from "../../models/user";
import { createResponse, responseStatus } from "../../helpers/ResponseCreator";

const GetDialogsListController: Handler = async (req, res) => {
    const ownerId = req.body.tokenPayload.id
    const user = await Users.findById(ownerId)
    .populate({
        path: 'dialogs',
        populate: {
            path: 'authors',
            select: 'firstname lastname image'
        }
    })
    const dialogs = user.dialogs
    
    res.status(200).json(createResponse(responseStatus.success, '', { dialogs }))
}

export default GetDialogsListController