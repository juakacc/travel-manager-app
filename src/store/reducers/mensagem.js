import { SET_MENSAGEM } from "../actions/actionTypes"

const initialState = {
    // title: '',
    message: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_MENSAGEM:
            return {
                ...state,
                // title: action.payload.title,
                message: action.payload
            }
        default:
            return state
    }
}

export default reducer