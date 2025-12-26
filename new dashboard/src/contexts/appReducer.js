export function appReducer(state, action) {

    switch (action.type) {
        case "getUser":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false
            }
        default:
            if (import.meta.env.MODE === "development") {
                throw new Error(`Unhandled action type: ${action.type}`)
            }
            return state;
    }

}

