import { MiddlewareAPI, AnyAction } from "redux"
import { pushMessage } from "../Redusers/dialogsReducer"
import { MessageItem, SendMessagePayload } from "../Types/dilaogsReducer.type"
import { ServerResponse } from "../../API/api.type"
import { Dispatch } from "react"

type WSConfig = {
    host: string
}

type WSAction = 
    ReturnType<typeof wsConnect> |
    ReturnType<typeof wsDisconnect> |
    ReturnType<typeof wsSendMessage> |
    ReturnType<typeof deleteMessage>

export const wsConnect = () => ({type: 'WS_CONNECT'} as const)
const wsConnection = () => ({type: 'WS_CONNECTION'} as const)
export const wsDisconnect = () => ({type: 'WS_DISCONNECT'} as const)
const wsDisconnection = () => ({type: 'WS_DISCONNECTION'} as const)
export const wsSendMessage = (messagePayload: SendMessagePayload) => ( 
    {type: 'SEND_MESSAGE', messagePayload} as const
)
export const deleteMessage = (messageId: string) => ({type: 'DELETE_MESSAGE', messageId})

//ws events handlers
const onClose = (store: MiddlewareAPI) => (e: CloseEvent) => {
    console.log('WS CLOSED')
    store.dispatch(wsDisconnection())
}
const onOpen = (store: MiddlewareAPI) => (e: Event) => {
    console.log('WS OPENED')
    store.dispatch(wsConnection())
}

const onMessage = (store: MiddlewareAPI) => (event: MessageEvent) => {
    const payload: ServerResponse<{dialogId: string, message: MessageItem}> = JSON.parse(event.data)
    payload.status
    ? store.dispatch(pushMessage(payload.data.message))
    : alert(payload.message)
}

const WebSocketMiddleware = (config: WSConfig) => {
    let socket: null | WebSocket = null

    return (store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: WSAction) => {
        switch (action.type) {
            case 'WS_CONNECT':
                if (socket !== null) socket.close()
                socket = new WebSocket(config.host)
                socket.onclose = onClose(store)
                socket.onmessage = onMessage(store)
                socket.onopen = onOpen(store)
                break;
            case 'WS_DISCONNECT': 
                if (socket !== null) socket.close()
                socket = null
                break;
            case 'SEND_MESSAGE':
                socket &&
                socket.send(JSON.stringify(action))
                break
            case 'DELETE_MESSAGE':
                socket &&
                socket.send(JSON.stringify(action))
                break
            default: 
                return next(action)
        }
    } 
}

export default WebSocketMiddleware
