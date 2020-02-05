import { USER_LOGGED_IN, USER_LOGGED_OUT, LOADING_USER, USER_LOADED } from "../actions/actionTypes"

const initialState = {
    id: 0,
    nome: null,
    apelido: null,
    token: null,
    isLoading: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_LOGGED_IN:
            return {
                ...state,
                id: action.payload.id,
                nome: action.payload.nome,
                apelido: action.payload.apelido,
                token: action.payload.token
            }
        case USER_LOGGED_OUT:
            return {
                ...initialState
            }
        case LOADING_USER:
            return {
                ...state,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}

export default reducer