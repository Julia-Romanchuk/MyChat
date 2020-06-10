import { OutgoingHttpHeaders } from "http"

export enum StatusCode {
    error,
    success
}

export type ServerResponse<D> = {
    status: StatusCode
    message: string
    data: D
}

export type RequestConstructor = ( 
    url: string, 
    method?: string, 
    payload?: any, 
    additionalHeaders?: OutgoingHttpHeaders ) => Promise<any>

export type APIMethodReturn<D> = Promise<ServerResponse<D>>