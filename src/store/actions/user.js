import { USER_LOGGED_IN, USER_LOADED, LOADING_USER } from "./actionTypes"

import { loadViagem } from './viagem'
import axios from "axios"

export const userLogged = user => {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

export const userLoggout = () => {
    return {
        type: USER_LOGGED_OUT
    }
}

export const login = user => {
    return dispatch => {
        dispatch(loadingUser())

        axios.post('login', {
            username: user.apelido,
            password: user.senha
        }, {
            headers: {
                'Content-Type': 'application/json',
            }
        })       
        .then(res => {
            const token = res.data.token

            axios.get(`motoristas/dados/${user.apelido}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })            
            .then(res => {
                delete user.senha
                user.id = res.data.id
                user.nome = res.data.nome
                user.token = token
                dispatch(userLogged(user))
                dispatch(loadViagem(user))
                dispatch(userLoaded())
            })
            .catch(err => console.log('LOGIN', err))
        })
        .catch(err => console.log('LOGIN', err))
    }
}

export const loadingUser = () => {
    return {
        type: LOADING_USER
    }
}

export const userLoaded = () => {
    return {
        type: USER_LOADED
    }
}