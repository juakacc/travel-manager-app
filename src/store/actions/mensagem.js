import { SET_MENSAGEM } from "./actionTypes"


export const setMensagem = msg => {
    return {
        type: SET_MENSAGEM,
        payload: msg
    }
}