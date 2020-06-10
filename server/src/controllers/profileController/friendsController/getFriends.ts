import { Handler } from "express"
import Users from "../../../models/user"
import { createResponse, responseStatus } from "../../../helpers/ResponseCreator"

const GetFriends: Handler = async (req, res) => {
    const userId = req.params.userId
    const user = await Users.findById(userId)
    .populate({
        path:'bestFriends',
        select: 'firstname lastname image',
        options: { limit: 20 }
    })
    const friendsList = user.bestFriends
    res.status(200).json(createResponse(responseStatus.success, '', { friendsList }))
}

export default GetFriends