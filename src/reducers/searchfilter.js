export function searchFilterReducers(state = { workplace: [], employmentType: [] }, action) {
    switch (action.type) {
        case 'SETWORKPLACE':
            return {
                workplace: action.payload,
                employmentType: [...state.employmentType]
            }
        case 'SETEMPLOYMENTTYPE':
            return {
                workplace: [...state.workplace],
                employmentType: action.payload
            }

        default:
            return state;
    }
}