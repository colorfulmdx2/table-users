import {UserType} from "../sever-api/api";


export const saveState = (state: UserType[]) => {

    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('favorites', serializedState);
    } catch {
        // ignore write errors
    }
};

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('favorites');
        if (serializedState === null) {
            return undefined;
        }
        let data = JSON.parse(serializedState)
        return data;
    } catch (err) {
        return undefined;
    }
};

export const deleteState  = () => {
    localStorage.removeItem('favorites')
}