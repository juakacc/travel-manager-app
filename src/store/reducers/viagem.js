import { INICIAR_VIAGEM, CONCLUIR_VIAGEM, SET_VIAGEM, LOAD_VIAGENS_NAO_CONCLUIDAS, LOAD_VIAGENS_CONCLUIDAS } from "../actions/actionTypes"

const initialState = {
    viagem: null,
    viagens_concluidas: [],
    viagens_nao_concluidas: []
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
        case LOAD_VIAGENS_NAO_CONCLUIDAS:
            return {
                ...state,
                viagens_nao_concluidas: action.payload
            }
        case LOAD_VIAGENS_CONCLUIDAS:
            return {
                ...state,
                viagens_concluidas: action.payload
            }
        default:
            return state
    }
}

export default reducer