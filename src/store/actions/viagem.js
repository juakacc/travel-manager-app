import { 
    INICIAR_VIAGEM, 
    CONCLUIR_VIAGEM, 
    SET_VIAGEM, 
    LOAD_VIAGENS_NAO_CONCLUIDAS, 
    LOAD_VIAGENS_CONCLUIDAS, 
    SET_VIAGENS_FILTRADAS, 
    INICIANDO_VIAGEM,
    VIAGEM_INICIADA
} from "./actionTypes"
import { setMensagem } from './mensagem'

import axios from 'axios'

export const viagemIniciada = viagem => {
    return {
        type: INICIAR_VIAGEM,
        payload: viagem
    }
}

export const iniciando_viagem = () => {
    return {
        type: INICIANDO_VIAGEM
    }
}

export const viagem_iniciada = () => {
    return {
        type: VIAGEM_INICIADA
    }
}

export const iniciarViagem = viagem => {
    return (dispatch, getState) => {
        dispatch(iniciando_viagem())
        axios.post('viagens', JSON.stringify(viagem), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getState().user.token
            }
        })
        .then(res => {
            dispatch(loadViagem(res.data.motorista))
            dispatch(loadViagensNaoConcluidas())
            dispatch(viagem_iniciada())
        })
        .catch(err => console.log('VIAGEM', err))        
    }
}

export const viagemConcluida = () => {
    return {
        type: CONCLUIR_VIAGEM
    }
}

export const concluirViagem = viagem => {
    return (dispatch, getState) => {
        dispatch(iniciando_viagem())
        axios.put(`viagens/concluir/${viagem.id}`, JSON.stringify(viagem.viagem), {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getState().user.token
            }
        })
        .then(res => {
            dispatch(viagemConcluida())
            dispatch(setMensagem('Viagem concluída com sucesso'))
            dispatch(viagem_iniciada())
        })
        .catch(err => console.log('VIAGEM', err))
    }
}

export const setViagem = viagem => {
    return {
        type: SET_VIAGEM,
        payload: viagem
    }
}

export const loadViagem = motorista => {
    return (dispatch, getState) => {
        axios.get(`viagens/nao-concluidas/${motorista.id}`, {
            headers: {
                'Authorization': 'Bearer ' + getState().user.token
            }
        })
        .then(res => {
            dispatch(setViagem(res.data))
        })
        .catch(err => console.log('VIAGEM: ', err))
    }
}

export const setViagensNaoConcluidas = viagens => {
    return {
        type: LOAD_VIAGENS_NAO_CONCLUIDAS,
        payload: viagens
    }
}

export const setViagensConcluidas = viagens => {
    return {
        type: LOAD_VIAGENS_CONCLUIDAS,
        payload: viagens
    }
}

export const loadViagensConcluidas = () => {
    return (dispatch, getState) => {
        axios.get('viagens/concluidas', {
            headers: {
                'Authorization': 'Bearer ' + getState().user.token
            }
        })
        .then(res => {
            dispatch(setViagensConcluidas(res.data))
        })
        .catch(err => console.log('VIAGEM', err))        
    }
}

export const loadViagensNaoConcluidas = () => {
    return (dispatch, getState) => {
        axios.get('viagens/nao-concluidas', {
            headers: {
                'Authorization': 'Bearer ' + getState().user.token
            }
        })
        .then(res => {
            dispatch(setViagensNaoConcluidas(res.data))
        })
        .catch(err => console.log('VIAGEM', err))
    }
}

export const setViagensFiltradas = viagens => {
    return {
        type: SET_VIAGENS_FILTRADAS,
        payload: viagens
    }
}

export const filtrarViagens = date => {
    return (dispatch, getState) => {
        axios.get(`viagens?date=${date}`, {
            headers: {
                'Authorization': 'Bearer ' + getState().user.token
            }
        })
        .then(res => {
            dispatch(setViagensFiltradas(res.data))
        })
        .catch(err => console.log('VIAGEM', err))
    }
}