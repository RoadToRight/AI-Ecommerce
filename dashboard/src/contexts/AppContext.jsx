import { createContext, useReducer } from "react";
import { initialState } from "./initialState";
import { appReducer } from "./AppReducer";

export const AppStateContext = createContext();
export const AppDispatchContext = createContext();

export function AppProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, initialState)

    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>
                {children}
            </AppDispatchContext.Provider>
        </AppStateContext.Provider>
    )
}