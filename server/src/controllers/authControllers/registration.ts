import { Request, Response } from 'express'
import Users from '../../models/user'
import { hashPassword } from '../../services/security'
import { createResponse } from '../../helpers/ResponseCreator'
import { responseStatus } from '../../helpers/ResponseCreator'

const RegistController = async (req: Request, res: Response) => {

    const {username, password, contacts} = req.body
    const email = contacts.email
    
    try {
        const userIsAlreadyExist = await Users.findOne({ username })
        if (userIsAlreadyExist) throw new Error(`User with username ${username} is already exist.`)
        const emailIsExist = await Users.findOne({ email: email })
        if (emailIsExist) throw new Error(`User with email ${email} is already exist.`)

        const hashedPassword = await hashPassword(password)

        await Users.create({...req.body, password: hashedPassword })
        res.status(201).json(createResponse(responseStatus.success, 'Registration successful!'))

    } catch (err) { 
        res.status(400).json(createResponse(responseStatus.error, err.message))
    }
}

export default RegistController