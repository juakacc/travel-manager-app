import { USER_LOGGED_IN, USER_LOGGED_OUT, LOADING_USER, USER_LOADED } from "../actions/actionTypes"

const initialState = {
    id: 0,
    nome: null,
    apelido: null,
    token: null,
    isLoading: false
}

const reducer = (prevState = initialState, action) => {
    switch(action.type) {
        case USER_LOGGED_IN:
            return {
                ...prevState,
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
                ...prevState,
                isLoading: true
            }
        case USER_LOADED:
            return {
                ...prevState,
                isLoading: false
            }
        default:
            return prevState
    }
}

export default reducer