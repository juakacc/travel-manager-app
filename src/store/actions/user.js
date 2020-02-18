import { USER_LOGGED_IN, USER_LOADED, LOADING_USER, USER_LOGGED_OUT } from "./actionTypes"

import { loadViagem } from './viagem'
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
        dispatch(setUser(user))
        dispatch(loadViagem(user))
        dispatch(load_veiculos_disponiveis())
        await AsyncStorage.setItem('userData', JSON.stringify(user))
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
            username: user.apelido,
            password: user.senha
        })       
        .then(res => {
            const token = res.data.token
            
            axios.get(`motoristas/dados/${user.apelido}`)            
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

export const salvar_usuario = user => {
    return dispatch => {
        dispatch(carregando_usuario())

        axios.post('motoristas', usuario)
        .then(res => {
            this.props.setMensagem('Motorista cadastrado')
            dispatch(usuario_carregado())
        })
        .catch(err => {
            this.props.setMensagem('Erro ao salvar motorista')
        })
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