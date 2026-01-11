export function appReducer(state, action) {

    switch (action.type) {
        case "getUser":
            return {
                ...state,
                user: action.payload || [],
                isAuthenticated: true,
                loading: false
            }
        case "getUserFailed":
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                loading: false
            }
        case "loggedIn":
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload || []
            }
        default:
            if (import.meta.env.MODE === "development") {
                throw new Error(`Unhandled action type: ${action.type}`)
            }
            return state;
    }

}

