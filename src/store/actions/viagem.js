import {
  INICIAR_VIAGEM,
  CONCLUIR_VIAGEM,
  SET_VIAGEM,
  LOAD_VIAGENS_NAO_CONCLUIDAS,
  LOAD_VIAGENS_CONCLUIDAS,
  SET_VIAGENS_FILTRADAS,
  INICIANDO_VIAGEM,
  VIAGEM_INICIADA,
  SUBMETENDO,
  SUBMETIDO,
} from './actionTypes';

import { setMensagem } from './mensagem';

import axios from 'axios';

export const viagemIniciada = viagem => {
  return {
    type: INICIAR_VIAGEM,
    payload: viagem,
  };
};

export const carregando_viagem = () => {
  return {
    type: INICIANDO_VIAGEM,
  };
};

export const viagem_carregada = () => {
  return {
    type: VIAGEM_INICIADA,
  };
};

export const submetendo = () => {
  return {
    type: SUBMETENDO,
  };
};

export const submetido = () => {
  return {
    type: SUBMETIDO,
  };
};

export const iniciarViagem = viagem => {
  return dispatch => {
    dispatch(carregando_viagem());
    dispatch(submetendo());

    axios
      .post('viagens', viagem)
      .then(res => {
        dispatch(setMensagem('Viagem iniciada. Siga as leis de trânsito'));
        dispatch(viagem_carregada());
        dispatch(submetido());
      })
      .catch(err => {
        dispatch(setMensagem(err));
        dispatch(submetido());
      });
  };
};

export const viagemConcluida = () => {
  return {
    type: CONCLUIR_VIAGEM,
  };
};

export const concluirViagem = viagem => {
  return dispatch => {
    dispatch(carregando_viagem());
    dispatch(submetendo());

    axios
      .put(`viagens/${viagem.id}`, viagem.viagem)
      .then(res => {
        dispatch(viagemConcluida());
        dispatch(setMensagem('Viagem concluída com sucesso'));
        dispatch(viagem_carregada());
        dispatch(submetido());
      })
      .catch(err => {
        dispatch(setMensagem(err));
        dispatch(submetido());
      });
  };
};

export const setViagem = viagem => {
  return {
    type: SET_VIAGEM,
    payload: viagem,
  };
};

export const loadViagem = () => {
  return (dispatch, getState) => {
    axios
      .get(`viagens/atual/${getState().user.id}`)
      .then(res => {
        dispatch(setViagem(res.data));
      })
      .catch(err => {
        if (err.response && err.response.status !== 404) {
          dispatch(setMensagem(err));
        }
      });
  };
};

export const setViagensNaoConcluidas = viagens => {
  return {
    type: LOAD_VIAGENS_NAO_CONCLUIDAS,
    payload: viagens,
  };
};

export const setViagensConcluidas = viagens => {
  return {
    type: LOAD_VIAGENS_CONCLUIDAS,
    payload: viagens,
  };
};

export const loadViagensConcluidas = () => {
  return dispatch => {
    axios
      .get('viagens?status=concluida')
      .then(res => {
        dispatch(setViagensConcluidas(res.data));
      })
      .catch(err => dispatch(setMensagem(err)));
  };
};

export const loadViagensNaoConcluidas = () => {
  return dispatch => {
    axios
      .get('viagens?status=nao-concluida')
      .then(res => {
        dispatch(setViagensNaoConcluidas(res.data));
      })
      .catch(err => dispatch(setMensagem(err)));
  };
};

export const setViagensFiltradas = viagens => {
  return {
    type: SET_VIAGENS_FILTRADAS,
    payload: viagens,
  };
};

export const filtrarViagens = date => {
  return dispatch => {
    dispatch(submetendo());

    axios
      .get(`viagens?date=${date}`)
      .then(res => {
        dispatch(setViagensFiltradas(res.data));
        dispatch(submetido());
      })
      .catch(err => {
        dispatch(setMensagem(err));
        dispatch(submetido());
      });
  };
};
