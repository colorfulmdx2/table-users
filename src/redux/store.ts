import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {reducer} from "./reducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    reducer: reducer,

})
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))

export type AppStateType = ReturnType<typeof reducers>


export default store

// @ts-ignore
window.store=store