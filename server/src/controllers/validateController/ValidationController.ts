import {Request, Response} from 'express'
import Users from '../../models/user'
import { createResponse, responseStatus } from '../../helpers/ResponseCreator'

const ValidationController = async (req: Request, res: Response) => {
    const property = req.params.propertyToValidate
    console.log(req.body)
    //@ts-ignore
    const user = await Users.findOne({ ...req.body })
    user
    ? res.status(400).json(createResponse(responseStatus.error, `User with this ${property} is already exist`))
    : res.status(200).json(createResponse(responseStatus.success))
}

export default ValidationController