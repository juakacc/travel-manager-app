import { USER_LOGGED_IN } from "./actionTypes"


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
    // fazer a solicitacao na api
    
}