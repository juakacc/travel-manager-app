import { INICIAR_VIAGEM, CONCLUIR_VIAGEM } from "./actionTypes"


export const iniciarViagem = viagem => {
    return {
        type: INICIAR_VIAGEM,
        payload: viagem
    }
}

export const concluirViagem = viagem => {
    return {
        type: CONCLUIR_VIAGEM,
        payload: viagem
    }
}