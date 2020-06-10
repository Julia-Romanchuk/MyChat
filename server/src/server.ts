import express, { Request, Response, NextFunction, Errback } from 'express'
import http from 'http'
import morgan from 'morgan'
import { config } from 'dotenv'
import { json } from 'body-parser'
import cors from 'cors'
import ws from 'ws'
import route from './routes/index'
import './services/dbConfig'
import { verifyTokenFunc } from './services/security'
import Dialogs from './models/dialog'
import SocketActions from './types/socketReq.type'
import Messages from './models/message'
import Users from './models/user'
import { Dialog } from './types/models.type'
import { strict } from 'assert'
import { createDialog, addMessage } from './controllers/dialogsController/sendMessage'
import { createSocketRes } from './helpers/ResponseCreator'

config()

const port = process.env.PORT || 3000
const hostname = 'localhost'
const app = express()
const server = http.createServer(app) 

const wss = new ws.Server({server, clientTracking: true})

const socketsConnections = new Map

wss.on('connection', (ws: WebSocket, req: Request) => {
    const userId = verifyTokenFunc(req.url.slice(1))
    socketsConnections.set(userId.id, ws)
    console.log('opened')

    ws.onmessage = async ({ data }) => {
        const payload: SocketActions = JSON.parse(data)
        console.log(payload.type)
        switch (payload.type) {
            case 'SEND_MESSAGE':
                try {
                    const recieverId = payload.messagePayload.userId
                    let dialog = 
                    payload.messagePayload.dialogId
                    ? await Dialogs.findById(payload.messagePayload.dialogId)
                    : await createDialog([userId.id, recieverId])
                    const message = await addMessage(dialog, {text: payload.messagePayload.text, author: userId.id})

                    if (socketsConnections.has(recieverId))//is user 'online'
                    socketsConnections.get(recieverId).send(createSocketRes(1, '', {dialogId: dialog._id, message}))
                    socketsConnections.get(userId.id).send((createSocketRes(1, '', {dialogId: dialog._id, message})))
                } catch (err) {
                    socketsConnections.get(userId.id).send(JSON.stringify({status: 0, message: err}))
                }
                break
            default:
                console.log('message comes')              
        }
    }
    ws.onclose = (event) => {
        console.log('Socket closed')
    }
})

wss.on('close', () => {

})

wss.on('error', (err)=> { console.log(err)})

app.use(morgan('dev'))
app.use(cors())
app.use(json())

app.use('/', route)

app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
    res.send(err)
})

server.listen(port as number, hostname, () => {
    console.log(`Server running on ${port}`)
})