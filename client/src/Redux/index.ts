import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import AuthReduser from './Redusers/authReducer'
import ProfileReduser from './Redusers/profileReducer'
import DialogsReduser from './Redusers/dialogsReducer'
import UsersReduser from './Redusers/usersReducer'
import WebSocketMiddleware from './WebSocketMiddleware/wsMiddleware'

const rootReducer = combineReducers({
    AuthReduser,
    ProfileReduser,
    DialogsReduser,
    UsersReduser
})

const store = createStore(rootReducer, applyMiddleware(thunk, WebSocketMiddleware({host: `ws://localhost:3001/${window.localStorage.getItem('token')}`})))

export type AppStateType = ReturnType<typeof rootReducer>

//@ts-ignore
window.store = store

export default store