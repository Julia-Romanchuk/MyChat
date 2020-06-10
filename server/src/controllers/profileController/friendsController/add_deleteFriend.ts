import { Handler } from "express"
import Users from "../../../models/user";
import { createResponse, responseStatus } from "../../../helpers/ResponseCreator";

export const addFriendController: Handler = async (req, res) => {
    const user = await Users.findById(req.body.tokenPayload.id)
    user.bestFriends.push(req.body.userId)
    await user.save()
    const friend = await Users.findById(req.body.userId)
    friend.followed = true
    await user.save()
    res.status(200).json(createResponse(responseStatus.success, 'Friend added', {isFollowed: true}))
}

export const removeFriendController: Handler = async (req, res) => {
    const user = await Users.findById(req.body.tokenPayload.id)
    var index = user.bestFriends.indexOf(req.body.userId);
    if (index > -1) {
        user.bestFriends.splice(index, 1);
    }
    await user.save()
    const friend = await Users.findById(req.body.userId)
    friend.followed = false
    res.status(200).json(createResponse(responseStatus.success, 'Friend removed', {isFollowed: false}))
}