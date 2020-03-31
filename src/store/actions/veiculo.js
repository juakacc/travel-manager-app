import {
  SET_VEICULOS_DISPONIVEIS,
  CARREGANDO_VEICULO,
  VEICULO_CARREGADO,
  SUBMETENDO,
  SUBMETIDO,
} from './actionTypes';

import { setMensagem } from './mensagem';

import axios from 'axios';

export const carregando_veiculo = () => {
  return {
    type: CARREGANDO_VEICULO,
  };
};

export const veiculo_carregado = () => {
  return {
    type: VEICULO_CARREGADO,
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

export const set_veiculos_disponiveis = veiculos => {
  return {
    type: SET_VEICULOS_DISPONIVEIS,
    payload: veiculos,
  };
};

export const load_veiculos_disponiveis = () => {
  return dispatch => {
    axios
      .get('veiculos/disponiveis')
      .then(res => {
        dispatch(set_veiculos_disponiveis(res.data));
      })
      .catch(err => dispatch(setMensagem(err)));
  };
};

export const salvar_veiculo = veiculo => {
  return dispatch => {
    dispatch(carregando_veiculo());
    dispatch(submetendo());

    axios
      .post('veiculos', veiculo)
      .then(res => {
        dispatch(veiculo_carregado());
        dispatch(submetido());
        dispatch(setMensagem('Veículo cadastrado'));
      })
      .catch(err => {
        dispatch(submetido());
        dispatch(setMensagem(err));
      });
  };
};

export const editar_veiculo = veiculo => {
  return dispatch => {
    dispatch(carregando_veiculo());
    dispatch(submetendo());

    axios
      .put(`veiculos/${veiculo.id}`, veiculo)
      .then(res => {
        dispatch(veiculo_carregado());
        dispatch(submetido());
        dispatch(setMensagem('Veículo atualizado'));
      })
      .catch(err => {
        dispatch(submetido());
        dispatch(setMensagem(err));
      });
  };
};
