import { Router } from 'express'
import searchUsers from '../controllers/usersController/searchUsers'

const usersRouter = Router()

usersRouter.route('/:usernameParam')
.get(searchUsers)

export default usersRouter