import { Router } from 'express'
import RegistController from '../controllers/authControllers/registration'
import LoginController from '../controllers/authControllers/login'
import { verifyToken } from '../services/security'
import AuthMeController from '../controllers/authControllers/authMe'

const authRouter = Router()

authRouter.use('/registration', RegistController )
authRouter.use('/login', LoginController )
authRouter.use('/authMe', verifyToken, AuthMeController)

export default authRouter