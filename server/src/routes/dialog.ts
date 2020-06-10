import { Router } from 'express'
import GetDialogsList from '../controllers/dialogsController/getDialogsList'
import GetDiolag from '../controllers/dialogsController/getDialog'
//import SendMessage from '../controllers/dialogsController/sendMessage'
//import CreateDialog from '../controllers/dialogsController/createDialog'

const dialogRouter = Router()

dialogRouter.get('/', GetDialogsList)
//dialogRouter.post('/', CreateDialog)
dialogRouter.get('/:dialogId', GetDiolag)
//dialogRouter.post('/sendMessage', SendMessage)

export default dialogRouter