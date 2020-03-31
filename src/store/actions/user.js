import {
  USER_LOGGED_IN,
  USER_LOADED,
  LOADING_USER,
  USER_LOGGED_OUT,
  SUBMETENDO,
  SUBMETIDO,
} from './actionTypes';

import { setMensagem } from './mensagem';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export const setUser = user => {
  return {
    type: USER_LOGGED_IN,
    payload: user,
  };
};

export const userLogged = user => {
  return async dispatch => {
    await AsyncStorage.setItem('userData', JSON.stringify(user));
    axios.defaults.headers.common = { Authorization: `Bearer ${user.token}` };
    dispatch(setUser(user));
    dispatch(usuario_carregado());
  };
};

export const userLog = () => {
  return {
    type: USER_LOGGED_OUT,
  };
};

export const userLoggout = () => {
  return async dispatch => {
    await AsyncStorage.setItem('userData', JSON.stringify({}));
    dispatch(userLog());
  };
};

export const login = user => {
  return dispatch => {
    dispatch(carregando_usuario());
    dispatch(submetendo());

    axios
      .post('login', {
        apelido: user.apelido,
        senha: user.senha,
      })
      .then(res => {
        const token = res.data.token;

        axios
          .get(`motoristas/${res.data.id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(motorista => {
            delete user.senha;
            user.id = motorista.data.id;
            user.nome = motorista.data.nome;
            user.token = token;
            user.permissoes = motorista.data.permissoes;

            dispatch(userLogged(user));
            dispatch(submetido());
          })
          .catch(err => {
            dispatch(setMensagem(err));
            dispatch(submetido());
          });
      })
      .catch(err => {
        dispatch(setMensagem(err));
        dispatch(submetido());
      });
  };
};

export const salvar_usuario = user => {
  return dispatch => {
    dispatch(carregando_usuario());
    dispatch(submetendo());

    axios
      .post('motoristas', user)
      .then(res => {
        dispatch(usuario_carregado());
        dispatch(submetido());
        dispatch(setMensagem('Motorista cadastrado'));
      })
      .catch(err => {
        dispatch(setMensagem(err));
        dispatch(submetido());
      });
  };
};

export const editar_usuario = user => {
  return dispatch => {
    dispatch(carregando_usuario());
    dispatch(submetendo());

    axios
      .put(`motoristas/${user.id}`, user)
      .then(res => {
        dispatch(usuario_carregado());
        dispatch(submetido());
        dispatch(setMensagem('Motorista atualizado'));
      })
      .catch(err => {
        dispatch(setMensagem(err));
        dispatch(submetido());
      });
  };
};

export const carregando_usuario = () => {
  return {
    type: LOADING_USER,
  };
};

export const usuario_carregado = () => {
  return {
    type: USER_LOADED,
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
