import { compare } from 'bcrypt'
import { Request, Response } from 'express'
import Users from '../../models/user'
import { createToken } from '../../services/security'
import { createResponse, responseStatus } from '../../helpers/ResponseCreator';

const LoginController = async (req: Request, res: Response) => {
    const { username, password, remember } = req.body
    if (!username || !password ) {
        res.sendStatus(400).json(createResponse(responseStatus.error, 'Both fields are required'))
        res.end()
    }
    try {
        const user = await Users.findOne({ username })
        if (!user) throw Error('Username or password is invalid.')
        const isPasswordMatches = await compare(password, user.password)
        if (!isPasswordMatches) throw Error('Username or password is invalid.')
        
        const token = await createToken(user._id)
        res.status(200).json(createResponse(responseStatus.success, 'Login successfuly', { token }))  
    } catch (err) {
        res.status(401).json(createResponse(responseStatus.error, err.message))
    }
}


export default LoginController