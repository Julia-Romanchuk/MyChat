import { UserItem } from "./profileReduser.type"

export interface SearchUserItem extends UserItem {
    username: string
}

export type InitialStateType = {
    usersList: Array<SearchUserItem> | null
}