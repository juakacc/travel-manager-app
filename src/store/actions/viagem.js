import { INICIAR_VIAGEM, CONCLUIR_VIAGEM, SET_VIAGEM } from "./actionTypes"
import functions from "../../functions"

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
            console.log(res)
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