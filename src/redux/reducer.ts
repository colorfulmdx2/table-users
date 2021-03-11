import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";
import {serviceApi, UserType} from "../sever-api/api";

export type ActionsType =
    | ReturnType<typeof setData>


let initialState = {
    usersData: [] as UserType[]
}

export type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const reducer = (state = initialState, action: ActionsType) => {

    switch (action.type) {
        case "SET_DATA": {
            return {...state, usersData: action.data}
        }
        default:
            return state;
    }
}
export const setData = (data: UserType[]) => ({type: 'SET_DATA', data} as const);

export const getDataTC = (): ThunkActionType => async (dispatch) => {
    let data = await serviceApi.getData()
    dispatch(setData(data))

}