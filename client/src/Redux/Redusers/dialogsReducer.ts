import { InitialStateType, Dialog, DialogListItem, MessageItem } from "../Types/dilaogsReducer.type";
import { Reducer, Dispatch } from "react";
import dialogsAPI from "../../API/dialodsAPI";

type CombinedActions = 
    ReturnType<typeof setDialogs> |
    ReturnType<typeof setDialog> |
    ReturnType<typeof pushMessage> |
    ReturnType<typeof wsSendMessage>

const initialState: InitialStateType = {
    dialogs: null,
    // @ts-ignore
    dialog: null,
}

const profileReduser: Reducer<InitialStateType, CombinedActions> = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_DIALOGS':
            return {...state, dialogs: action.dialogs}
        case 'SET_DIALOG':
            return {...state, dialog: action.dialog}
        case 'PUSH_MESSAGE':
            return {...state, dialog: {...state.dialog, messages: [...state.dialog.messages, action.message]}}
        default:
            return state
    }
}

const setDialogs = (dialogs: Array<DialogListItem>) => ({type: 'SET_DIALOGS', dialogs} as const)
const setDialog = (dialog: Dialog) => ({type: 'SET_DIALOG', dialog} as const)
export const pushMessage = (message: MessageItem) => ({type: 'PUSH_MESSAGE', message} as const )
export const wsSendMessage = (messagePayload: {text: string, userId: string ,dialogId?: string}) => (
    {type: 'SEND_MESSAGE', messagePayload} as const
)

export const getDialogs = () => async (dispatch: Dispatch<CombinedActions>) => {
    const response = await dialogsAPI.getDialogs()
    response.status
    ? dispatch(setDialogs(response.data.dialogs))
    : console.log('ERROR')
}

export const getDialog = (dialogId: string) => async (dispatch: Dispatch<CombinedActions>) => {
    const response = await dialogsAPI.getDialog(dialogId)
    response.status
    ? dispatch(setDialog(response.data.dialog))
    : console.log('ERROR')
}

export const sendMessage = (text: string, userId: string ,dialogId?: string) => 
    async (dispatch: Dispatch<CombinedActions>) => {
            const messagePayload = {text, userId, dialogId}
            dispatch(wsSendMessage(messagePayload))

}

export default profileReduser