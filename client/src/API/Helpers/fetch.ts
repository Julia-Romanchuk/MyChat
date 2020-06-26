import { RequestConstructor } from "../api.type"

export const request: RequestConstructor = async (url, method, payload?, additionalHeaders?) => {
    const response = 
    await fetch (/*process.env.BASE_URL'http://localhost:3001' +*/ url, {
        method, 
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json', ...additionalHeaders}
    })
    return await response.json()
}

export const requestWithCredentials: RequestConstructor = async (url, method?, payload?, additionalHeaders?) => {
    const Bearer = 'Bearer ' + localStorage.getItem('token')
    return await request(url, method, payload, { 'Authorization': Bearer, ...additionalHeaders })
}