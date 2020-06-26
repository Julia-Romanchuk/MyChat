import { Dialog, DialogListItem, MessageItem } from "../Types/dilaogsReducer.type";
import dialogsAPI from "../../API/dialodsAPI";
import { Reducer, ThunkBase } from "../Types/common.type";

const initialState: InitialState = {
    dialogs: null,
    dialog: null,
    collocutorId: ''
}

const profileReduser = (state: InitialState = initialState, action: CombinedActions): InitialState => {
    switch (action.type) {
        case 'dialogs/SET_DIALOGS':
            return {...state, dialogs: action.dialogs}
        case 'dialogs/SET_DIALOG':
            return {...state, dialog: action.dialog}
        case 'dialogs/PUSH_MESSAGE':
            if (state.dialog)
            return {...state, dialog: {...state.dialog, messages: [...state.dialog.messages, action.message]}}
            return {...state}
        case 'dialogs/SET_USER_ID': 
            return {...state, collocutorId: action.collocutorId}
        default:
            return state
    }
}

const setDialogs = (dialogs: Array<DialogListItem>) => ({type: 'dialogs/SET_DIALOGS', dialogs} as const)
const setDialog = (dialog: Dialog) => ({type: 'dialogs/SET_DIALOG', dialog} as const)
export const pushMessage = (message: MessageItem) => ({type: 'dialogs/PUSH_MESSAGE', message} as const )
export const wsSendMessage = (messagePayload: {text: string, userId: string ,dialogId?: string}) => (
    {type: 'SEND_MESSAGE', messagePayload} as const
)
export const setCollocutorId = (collocutorId: string) => ({type: 'dialogs/SET_USER_ID', collocutorId} as const)

export const getDialogs = (): Thunk => async (dispatch) => {
    const response = await dialogsAPI.getDialogs()
    response.status
    ? dispatch(setDialogs(response.data.dialogs))
    : console.log('ERROR')
}

export const getDialog = (dialogId: string): Thunk => async (dispatch) => {
    const response = await dialogsAPI.getDialog(dialogId)
    response.status
    ? dispatch(setDialog(response.data.dialog))
    : console.log('ERROR')
}

export const sendMessage = (text: string, userId: string ,dialogId?: string): Thunk => 
    async (dispatch) => {
        const messagePayload = {text, userId, dialogId}
        dispatch(wsSendMessage(messagePayload))

}

export default profileReduser


type CombinedActions = 
    ReturnType<typeof setDialogs> |
    ReturnType<typeof setDialog> |
    ReturnType<typeof pushMessage> |
    ReturnType<typeof wsSendMessage> |
    ReturnType<typeof setCollocutorId>

type InitialState = {
    dialogs: null | Array<DialogListItem>
    dialog: null | Dialog
    collocutorId: string
}

type Thunk = ThunkBase<CombinedActions>