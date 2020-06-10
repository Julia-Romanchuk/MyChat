import { Request, Response } from "express"
import { User } from "../../types/models.type"
import Users from "../../models/user"
import { createResponse, responseStatus } from "../../helpers/ResponseCreator"

const UpdateProfile = async (req: Request, res: Response) => {
    const { tokenPayload, profile } = req.body 
    const updatedProfile: User = await Users.findByIdAndUpdate(tokenPayload.id, profile)
    .populate({
        path:'bestFriends',
        select: 'firstname lastname image',
        options: { limit: 6 }
    })
    updatedProfile
    ? res.status(200).json(createResponse(responseStatus.success, 'Profile updated successfully', {profile: updatedProfile}))
    : res.status(400).json(createResponse(responseStatus.error, 'Profile was not updated.'))
}

export default UpdateProfile