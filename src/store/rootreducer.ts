import { combineReducers } from "redux"
import { currentView } from "./reducers/currentView";

export const rootReducer = combineReducers({
 currentView, 
})

export type RootState = ReturnType<typeof rootReducer>;
