import { Schema, model } from 'mongoose'
import { Dialog } from '../types/models.type'

const Dialog = new Schema<Dialog>({
    messages: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
        default: []
    },
    authors: {        
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        required: true        
    }  
})

const Dialogs = model<Dialog>('Dialog', Dialog)

export default Dialogs