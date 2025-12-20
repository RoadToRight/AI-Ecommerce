export function appReducer(state, action) {

    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.payload }
        default:
            if (import.meta.env.MODE === "development") {
                throw new Error(`Unhandled action type: ${action.type}`)
            }
            return state;
    }

}