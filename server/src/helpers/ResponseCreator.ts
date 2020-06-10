export enum responseStatus {
    error,
    success
}

export const createResponse = (status: responseStatus, message: string = '', data?: any ) => {
    return {
        status,
        message,
        data
    }
}

export const createSocketRes = (status: responseStatus, message: string = '', data?: any ) => {
    const response = JSON.stringify({status, message, data})
    return response
}