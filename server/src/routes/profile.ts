import { Router } from 'express'
import UpdateProfile from '../controllers/profileController/updateProfile'
import { verifyToken } from '../services/security'
import UploadAvatar from '../controllers/profileController/uploadAvatar'
import GetProfile from '../controllers/profileController/getProfile'
import upload from '../services/cloudStorageConfig'
import GetFriednds from '../controllers/profileController/friendsController/getFriends'

const profileRouter = Router()

profileRouter.put('/updateProfile', UpdateProfile)
profileRouter.put('/uploadAvatar', upload.single('image'), verifyToken, UploadAvatar)
profileRouter.get('/:userId', GetProfile)
profileRouter.get('/:userId/friends', GetFriednds)

export default profileRouter