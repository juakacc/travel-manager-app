import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../actions/actionTypes"

const initialState = {
    id: 0,
    nome: null,
    apelido: null
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_LOGGED_IN:
            return {
                ...state,
                id: action.payload.id,
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