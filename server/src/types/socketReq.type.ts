
export type RecievedMessage = {
    type: 'SEND_MESSAGE'
    messagePayload: {
        dialogId?: string
        userId: string
        text: string
    }
} 

type SocketActions = RecievedMessage

export default SocketActions

