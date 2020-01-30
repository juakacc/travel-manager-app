import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../actions/actionTypes"

const initialState = {
    nome: null,
    apelido: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_LOGGED_IN:
            return {
                ...state,
                nome: action.payload.nome,
                apelido: action.payload.apelido
            }
        case USER_LOGGED_OUT:
            return {
                ...initialState
            }
        default:
            return state
    }
}

export default reducer