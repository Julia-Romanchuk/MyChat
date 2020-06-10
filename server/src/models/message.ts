import { Schema, model } from 'mongoose'
import { Message } from '../types/models.type'

const Message = new Schema<Message>({
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true}
)

const Messages = model<Message>('Message', Message)

export default Messages