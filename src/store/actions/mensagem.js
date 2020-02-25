import { SET_MENSAGEM } from "./actionTypes"

import { userLoggout } from '../actions/user'

import NavigatorService from '../../NavigatorService'

export const setMensagem = msg => {
    return dispatch => {
        if (typeof msg === 'string') { // Caso seja uma mensagem direta
            dispatch(set_mensagem_string(msg))
        } else if (msg.response) {
            if (msg.response.data) {
                if (msg.response.data.tokenExpirado) {
                    dispatch(set_mensagem_string('Token expirado, refaça o login.'))
                    dispatch(userLoggout())
                    NavigatorService.navigate('Splash')
                } else {
                    dispatch(set_mensagem_string(msg.response.data.mensagem || 'Erro de comunicação'))
                }
            } else {
                dispatch(set_mensagem_string('Erro de comunicação'))
            }
        } else {
            dispatch(set_mensagem_string('Erro de comunicação'))
        }
    }
}

export const set_mensagem_string = mensagem => {
    return {
        type: SET_MENSAGEM,
        payload: mensagem
    }
}