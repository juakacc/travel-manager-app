import { INICIAR_VIAGEM, CONCLUIR_VIAGEM } from "../actions/actionTypes"


const initialState = {
    viagem: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case INICIAR_VIAGEM:
            return {
                ...state,
                viagem: action.payload.viagem
            }
        case CONCLUIR_VIAGEM:
            return {
                ...state,
                viagem: null
            }
        default:
            return state
    }
}

export default reducer