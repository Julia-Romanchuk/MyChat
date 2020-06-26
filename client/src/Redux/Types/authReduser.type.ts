export type ResultType = {
    status: number
    message: string
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