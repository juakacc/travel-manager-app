import { SET_VEICULOS_DISPONIVEIS, CARREGANDO_VEICULO, VEICULO_CARREGADO } from './actionTypes'

import { setMensagem } from './mensagem'

import axios from 'axios'

export const carregando_veiculo = () => {
    return {
        type: CARREGANDO_VEICULO
    }
}

export const veiculo_carregado = () => {
    return {
        type: VEICULO_CARREGADO
    }
}

export const set_veiculos_disponiveis = veiculos => {
    return {
        type: SET_VEICULOS_DISPONIVEIS,
        payload: veiculos
    }
}

export const load_veiculos_disponiveis = () => {
    return (dispatch) => {
        axios.get('veiculos/disponiveis')
        .then(res => {
            dispatch(set_veiculos_disponiveis(res.data))
        })
        .catch(err => dispatch(setMensagem(err)))
    }    
}

export const salvar_veiculo = veiculo => {
    return (dispatch) => {
        dispatch(carregando_veiculo())

        axios.post('veiculos', veiculo)
        .then(res => {
            dispatch(setMensagem('Veículo cadastrado'))
            dispatch(veiculo_carregado())
            // dispatch(load_veiculos_disponiveis())
        })
        .catch(err => {
            dispatch(setMensagem(err))
        })
    }
}