export type UserItem = {
    firstname: string
    lastname: string
    image?: string
    _id: string
}

export type Contacts = {
    mobile?: number
    email: string
    website?: string
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
    contacts: Contacts
    address?: {
        country: string
        city: string
    },
    blackList?: Array<UserItem>
    bestFriends: Array<UserItem>
    followed: boolean 
    dialogId: string | undefined
}
