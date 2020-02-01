import { USER_LOGGED_IN } from "./actionTypes"
import functions from "../../functions"

import { loadViagem } from './viagem'

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
        fetch(functions.getAddress() + 'motoristas/' + 1, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => {
            dispatch(userLogged(res))
            dispatch(loadViagem(res))
        })
        .catch(err => console.log(err.message))
    }
}