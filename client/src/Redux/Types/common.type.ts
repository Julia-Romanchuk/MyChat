import { ThunkAction } from "redux-thunk";
import { AppStateType } from "..";
import { Action } from "redux";

export type ThunkBase<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, undefined, A>
export type Reducer<S, A extends Action> = (initialState: S, action: A) => S 
