import { createResponse, responseStatus } from "../../helpers/ResponseCreator"
import { Response, Request } from "express"

const AuthMeController = (req: Request, res: Response) => {
    const { tokenPayload } = req.body 
    tokenPayload
    ? res.status(200).json(createResponse(responseStatus.success, '', {ownerId: tokenPayload.id}))
    : res.status(401).json(createResponse(responseStatus.error, 'User are not authorized')) 
}

export default AuthMeController