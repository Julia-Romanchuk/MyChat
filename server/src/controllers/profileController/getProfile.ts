import { Request, Response } from "express"
import Users from "../../models/user"
import { createResponse, responseStatus } from "../../helpers/ResponseCreator"


const GetProfile = async (req: Request, res: Response) => {
    const tokenId = req.body.tokenPayload.id
    const userId = req.params.userId
    const profile = await Users.findById(userId)
    .populate({
        path:'bestFriends',
        select: 'firstname lastname image',
        options: { limit: 6 }
    })
    //.populate({
    //    path: 'dialogs',
    //    select: 'authors'
    //})
    if (userId !== tokenId) { //is it request to the owner profile, if it is, we can't add himself to friends  
        const owner = await Users.findById(tokenId)
        const dialogId =  owner.dialogs.filter(dialogId => profile.dialogs.includes(dialogId)) // check is users have dialog
        profile.dialogId = dialogId[0]
        owner.bestFriends.includes(profile._id) //if the requested user is a friend of the owner 
        ? profile.followed = true // and add corresponding property
        : profile.followed = false
    }
    res.status(200).json(createResponse(responseStatus.success, '', { profile }))
}

export default GetProfile