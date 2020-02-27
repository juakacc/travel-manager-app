import { USER_LOGGED_IN, USER_LOGGED_OUT, LOADING_USER, USER_LOADED, SUBMETENDO, SUBMETIDO } from "../actions/actionTypes"

const initialState = {
    id: 0,
    nome: null,
    apelido: null,
    token: null,
    isLoading: false,
    isSubmetendo: false // para desabilitar os botões durante a requisição
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
        case SUBMETENDO:
            return {
                ...prevState,
                isSubmetendo: true
            }
        case SUBMETIDO:
            return {
                ...prevState,
                isSubmetendo: false
            }
        default:
            return prevState
    }
}

export default reducer