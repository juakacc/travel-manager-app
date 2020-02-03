import { INICIAR_VIAGEM, CONCLUIR_VIAGEM, SET_VIAGEM, LOAD_VIAGENS_NAO_CONCLUIDAS, LOAD_VIAGENS_CONCLUIDAS } from "./actionTypes"
import functions from "../../functions"
import { Alert } from "react-native"

export const viagemIniciada = viagem => {
    return {
        type: INICIAR_VIAGEM,
        payload: viagem
    }
}

export const iniciarViagem = viagem => {
    return dispatch => {
        fetch(functions.getAddress() + 'viagens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(viagem)
        })
        .then(res => res.json())
        .then(res => {
            dispatch(loadViagem(res.motorista))
            dispatch(loadViagensNaoConcluidas())
        })
        .catch(error => console.log('INICIAR_VIAGEM: ' + error.message))
    }
}

export const viagemConcluida = () => {
    return {
        type: CONCLUIR_VIAGEM
    }
}

export const concluirViagem = viagem => {
    return dispatch => {
        fetch(functions.getAddress() + 'viagens/concluir/' + viagem.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(viagem)
        })
        .then(res => res.text())
        .then(res => {
            dispatch(viagemConcluida())
            Alert.alert('Viagem concluída com sucesso')
        })
        .catch(err => console.log('CONCLUIR_VIAGEM: ' + err.message))
    }
}

export const setViagem = viagem => {
    return {
        type: SET_VIAGEM,
        payload: viagem
    }
}

export const loadViagem = motorista => {
    return dispatch => {
        fetch(functions.getAddress() + 'viagens/nao-concluidas/' + motorista.id, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => {
            dispatch(setViagem(res))
        })
        .catch(err => {
            console.log('CARREGAR_VIAGEM: ' + err.message)
        })
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
    return dispatch => {
        fetch(functions.getAddress() + 'viagens/concluidas', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => {
            dispatch(setViagensConcluidas(res))
        })
        .catch(err => console.log(err))
    }
}

export const loadViagensNaoConcluidas = () => {
    return dispatch => {
        fetch(functions.getAddress() + 'viagens/nao-concluidas', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => {
            dispatch(setViagensNaoConcluidas(res))
        })
        .catch(err => console.log(err))
    }
}