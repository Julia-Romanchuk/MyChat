export type ResultType = {
    status: null | number
    message: string
}

export type InitialStateType = {
    registrationResult: ResultType
    loginResult: ResultType
    isAuthorized: boolean
    ownerId: string | null
    feachingInProgress: boolean
}

export type RegistFormData = {
    firstname: string
    secondname: string
    contscts: {
        email: string
    }
    nickname: string
    password: string
}

export type LoginFormData = {
    username: string
    password: string
}