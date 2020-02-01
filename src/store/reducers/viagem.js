import { INICIAR_VIAGEM, CONCLUIR_VIAGEM, SET_VIAGEM } from "../actions/actionTypes"

const initialState = {
    viagem: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case INICIAR_VIAGEM:
            return {
                ...state,
                viagem: action.payload
            }
        case CONCLUIR_VIAGEM:
            return initialState
        case SET_VIAGEM:
            return {
                ...state,
                viagem: action.payload
            }
        default:
            return state
    }
}

export default reducer