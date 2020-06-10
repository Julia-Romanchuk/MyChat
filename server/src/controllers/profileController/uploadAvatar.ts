import { User } from "../../types/models.type"
import Users from "../../models/user"
import { Request, Response } from "express"
import { createResponse, responseStatus } from "../../helpers/ResponseCreator"

const UploadAvatar = async (req: Request, res: Response) => {
      try {
            const { tokenPayload } = req.body
            const user: User = await Users.findById(tokenPayload.id)
            //@ts-ignore
            const avatarURL: string = req.file.url 
            user.image = avatarURL
            await user.save()
            res.status(200).json(createResponse(responseStatus.success, 'ok', { avatarURL })) 
      } catch (err) {
            res.status(400).json(createResponse(responseStatus.error, err))
      }
}

export default UploadAvatar