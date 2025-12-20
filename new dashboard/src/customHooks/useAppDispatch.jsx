import { useContext } from "react";
import { AppDispatchContext } from "../contexts/AppContext";

export function useAppDispatch() {
    const context = useContext(AppDispatchContext);
    if (context === undefined) {
        throw new Error('useAppDispatch must be used within AppProvider');
    }
    return context;
}