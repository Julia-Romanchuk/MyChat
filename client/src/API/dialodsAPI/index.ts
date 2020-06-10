import DialogsAPI from "./dialogsAPI.type"
import { requestWithCredentials } from "../Helpers/fetch"

const dialogsAPI: DialogsAPI = {
    async getDialogs () {
        return await requestWithCredentials('/dialogs')
    },
    async getDialog (dialogId) {
        return await requestWithCredentials(`/dialogs/${dialogId}`)
    },
}

export default dialogsAPI