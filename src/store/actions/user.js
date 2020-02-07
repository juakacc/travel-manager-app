import { USER_LOGGED_IN, USER_LOADED, LOADING_USER, USER_LOGGED_OUT } from "./actionTypes"

import { loadViagem } from './viagem'
import axios from "axios"
import AsyncStorage from "@react-native-community/async-storage"


export const setUser = user => {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

export const userLogged = user => {
    
    return async dispatch => {
        dispatch(setUser(user))
        dispatch(loadViagem(user))
        await AsyncStorage.setItem('userData', JSON.stringify(user))
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
        dispatch(userLoaded())
    }
}

export const userLog = () => {
    return {
        type: USER_LOGGED_OUT
    }
}

export const userLoggout = () => {
    return async dispatch => {
        await AsyncStorage.setItem('userData', JSON.stringify({}))
        dispatch(userLog())
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
                    'Authorization': `Bearer ${token}`
                }
            })            
            .then(async res => {
                delete user.senha
                user.id = res.data.id
                user.nome = res.data.nome
                user.token = token

                dispatch(userLogged(user))
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