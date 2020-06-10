import { Router } from 'express'
import { addFriendController, removeFriendController } from '../controllers/profileController/friendsController/add_deleteFriend'
import {  } from '../controllers/profileController/friendsController/getFriends'

const friendRouter = Router()

friendRouter.route('/')
.put(addFriendController)
.delete(removeFriendController)

export default friendRouter