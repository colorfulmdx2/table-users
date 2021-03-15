import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";
import {serviceApi, UserType} from "../sever-api/api";
import {loadState} from "../local-storage/local-storage";

export type ActionsType =
    | ReturnType<typeof setData>
    | ReturnType<typeof setLanguage>
    | ReturnType<typeof setView>
    | ReturnType<typeof setTypeOfSorting>
    | ReturnType<typeof setOrder>
    | ReturnType<typeof setSearch>
    | ReturnType<typeof addToFavorites>
    | ReturnType<typeof removeFromFavorites>
    | ReturnType<typeof setFavorites>



let initialState = {
    usersData: [] as UserType[],
    favorites: [] as UserType[],
    view: 'table' as string,
    order: 'asc' as string,
    typeOfSorting: '' as string,
    search: '' as string,
    lang:'en' as string,
    languagePackage: {
        en:{
            search: 'Search',
            byName: 'name',
            byId: 'by id',
            byAge: 'age',
            asc: 'asc',
            des: 'des',
            table: 'table',
            preview: 'preview',
            age: 'years'
        },
        ru:{
            search: 'Поиск',
            byName: 'имя',
            byId: 'по id',
            byAge: 'возраст',
            asc: 'вверх',
            des: 'вниз',
            table: 'таблица',
            preview: 'превью',
            age: 'лет'
        }
    }
}

export type ThunkActionType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>

export const reducer = (state = initialState, action: ActionsType) => {

    switch (action.type) {
        case "SET_DATA": {
            return {...state, usersData: action.data , usersDataCopy: action.data}
        }
        case "SET_LANGUAGE": {
            return {...state, lang: action.language}
        }
        case "SET_ORDER": {
            return {...state, order: action.order}
        }
        case "SET_SEARCH": {
            return {
                ...state, search: action.value.toLowerCase()
            }
        }
        case "SET_TYPE": {
            return {...state, typeOfSorting: action.sortType}
        }
        case "SET_VIEW": {
            return {...state, view: action.view}
        }
        case "ADD_TO_FAVORITES": {
            return {...state, favorites: [...state.favorites, action.user]}
        }
        case "REMOVE_FROM_FAVORITES": {
            return {...state, favorites: [...state.favorites.filter((e) => e.id !== action.user.id)]}
        }
        case "SET_FAVORITES": {
            return {...state, favorites: action.data}
        }
        default:
            return state;
    }
}
export const setData = (data: UserType[]) => ({type: 'SET_DATA', data} as const);
export const setLanguage = (language: string) => ({type: 'SET_LANGUAGE', language} as const);
export const setView = (view: string) => ({type: 'SET_VIEW', view} as const);
export const setTypeOfSorting = (sortType: string) => ({type: 'SET_TYPE', sortType} as const);
export const setOrder = (order: string) => ({type: 'SET_ORDER', order} as const);
export const setSearch = (value: string) => ({type: 'SET_SEARCH', value} as const);
export const addToFavorites = (user: UserType) => ({type: 'ADD_TO_FAVORITES', user} as const);
export const removeFromFavorites = (user: UserType) => ({type: 'REMOVE_FROM_FAVORITES', user} as const);
export const setFavorites = (data: UserType[]) => ({type: 'SET_FAVORITES', data} as const);

export const getDataTC = (): ThunkActionType => async (dispatch) => {
    let data = await serviceApi.getData()
    dispatch(setData(data))

}
export const getFavoritesTC = (): ThunkActionType => async (dispatch) => {
    let data = loadState()
    if (data) {
        dispatch(setFavorites(data))
    }

}