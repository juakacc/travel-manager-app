import { USER_LOGGED_IN, USER_LOADED, LOADING_USER, USER_LOGGED_OUT } from "./actionTypes"

import { loadViagem } from './viagem'
import { setMensagem } from './mensagem'
import { load_veiculos_disponiveis } from './veiculo'
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
        await AsyncStorage.setItem('userData', JSON.stringify(user))
        axios.defaults.headers.common = {'Authorization': `Bearer ${user.token}`}
        dispatch(setUser(user))
        dispatch(loadViagem(user))
        dispatch(load_veiculos_disponiveis())
        dispatch(usuario_carregado())
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
        dispatch(carregando_usuario())

        axios.post('login', {
            apelido: user.apelido,
            senha: user.senha
        })       
        .then(res => {
            const token = res.data.token
            
            axios.get(`motoristas/${res.data.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })            
            .then(motorista => {
                delete user.senha
                user.id = motorista.data.id
                user.nome = motorista.data.nome
                user.token = token

                dispatch(userLogged(user))
            })
            .catch(err => dispatch(setMensagem(err.response.data.mensagem)))
        })
        .catch(err => dispatch(setMensagem(err.response.data.mensagem)))
    }
}

export const salvar_usuario = user => {
    return dispatch => {
        dispatch(carregando_usuario())

        axios.post('motoristas', user)
        .then(res => {
            dispatch(dispatch(setMensagem('Motorista cadastrado')))
            dispatch(usuario_carregado())
        })
        .catch(err => dispatch(setMensagem(err.response.data.mensagem)))
    }
}

export const carregando_usuario = () => {
    return {
        type: LOADING_USER
    }
}

export const usuario_carregado = () => {
    return {
        type: USER_LOADED
    }
}