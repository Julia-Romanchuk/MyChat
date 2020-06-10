export type UserItem = {
    firstname: string
    lastname: string
    image?: string
    _id: string
}

export type ProfileType = {
    _id: string
    username: string
    firstname: string
    lastname: string
    status?: string
    birthDate?: Date
    aboutMe?: string
    image?: string
    contacts: {
        mobile?: number
        email: string
        website?: string
    }
    address?: {
        country: string
        city: string
    },
    blackList?: Array<UserItem>
    bestFriends: Array<UserItem>
    followed: boolean 
    dialogId: string | undefined
}
type ResultType = {
    status: null | number
    message: string
}

export type InitialStateType = {
    profile: any //ProfileType | null
    isFollowed: boolean
    friendsList: Array<UserItem> | null
} 