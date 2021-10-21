import { types } from "../types/types"

const initialState = {
    nominaData: []
}

export const nominaReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.nominaAdd: return {
            ...state,
            nominaData: [
                ...state.nominaData,
                action.payload
            ]
        }
        case types.nominaRead: return {
            ...state, 
            nominaData: action.payload
        }
        case types.nominaDelete: return {
            ...state,
            nominaData: state.nominaData.filter((nomina) => {
                return nomina.id !== action.payload 
            })
        }
        case types.nominaClean: return {
            ...state,
            nominaData: []
        }
        default: return state
    }
} 