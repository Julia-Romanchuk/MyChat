import {Request, Response, Router} from 'express'
import { verifyToken } from '../services/security'
import ValidationController from '../controllers/validateController/ValidationController'
import authRourer from './auth'
import profileRouter from './profile'
import friendsRouter from './friends'
import dialogRouter from './dialog'
import usersRouter from './users'

const router = Router()

router.use('/auth', authRourer)
router.use('/profile', verifyToken, profileRouter)
router.use('/friends', verifyToken, friendsRouter)
router.use('/dialogs', verifyToken, dialogRouter)
router.use('/users', usersRouter)
router.use('/validate/:propertyToValidate', ValidationController)

router.get('/', (req: Request, res: Response) => res.end('Ups'))

export default router

