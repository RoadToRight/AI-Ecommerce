import { useContext } from "react";
import { AppStateContext } from "../contexts/AppContext";

export function useAppState() {
    const context = useContext(AppStateContext);
    if (context === undefined) {
        throw new Error('useAppState must be used within AppProvider');
    }
    return context;
}
