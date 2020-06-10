import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

import { createResponse, responseStatus } from '../helpers/ResponseCreator'

export const hashPassword = async (plainTextPassword: string) => {
    const hashResult = await bcrypt.hash(plainTextPassword, process.env.SALT)
    return hashResult
}

const salt = (operation: 'add' |'remove', token: string) => {
    const tokenParts = token.split('.')
    switch (operation) {
        case 'add': 
            tokenParts[1] = tokenParts[1] + process.env.SALT
            return tokenParts.join('.')
        case 'remove': 
            tokenParts[1] = tokenParts[1].slice(0, -process.env.SALT.length)
            return tokenParts.join('.')
    }
}

export const createToken = async ( id: string ) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET)
    return salt('add', token)
}

export const verifyTokenFunc = (authHeaderValue: string) => {
    const correctToken = salt('remove', authHeaderValue)
    const tokenPayload = verify(correctToken, process.env.JWT_SECRET)
    return tokenPayload as {id: string}
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
        res.status(401).json(createResponse(responseStatus.error, 'You are not authorized'))
    } else {
        try {
            //const token = authHeader.slice(7)
            //const correctToken = salt('remove', token)
            //const tokenPayload = verify(correctToken, process.env.JWT_SECRET)
            const token = authHeader.slice(7)
            req.body.tokenPayload = verifyTokenFunc(token)
            next()
        } catch (err) {
            res.status(403).json(createResponse(responseStatus.error, 'Access is forbidden. Invalid token'))
        }
    }
}