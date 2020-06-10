import { Dialog, DialogListItem } from "../../Redux/Types/dilaogsReducer.type";
import { APIMethodReturn } from "../api.type";

type DialogsAPI = {
    getDialogs: () => APIMethodReturn<{ dialogs: Array<DialogListItem> }>
    getDialog: (dialogId: string) => APIMethodReturn<{ dialog: Dialog }>
}

export default DialogsAPI