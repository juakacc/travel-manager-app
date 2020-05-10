import { SET_MENSAGEM } from './actionTypes';

import { userLoggout } from '../actions/user';
// import NavigatorService from '../../navigator/NavigatorService';

export const setMensagem = msg => {
  return dispatch => {
    const msg_padrao =
      'Erro de comunicação, verifique sua conexão com a internet';

    if (typeof msg === 'string') {
      // Caso seja uma mensagem direta
      dispatch(set_mensagem_string(msg));
    } else if (msg.response) {
      if (msg.response.data) {
        if (msg.response.data.tokenExpirado) {
          dispatch(set_mensagem_string('Token expirado, refaça o login.'));
          dispatch(userLoggout());
          // NavigatorService.navigate('Auth');
        } else {
          dispatch(
            set_mensagem_string(msg.response.data.mensagem || msg_padrao),
          );
        }
      } else {
        dispatch(set_mensagem_string(msg_padrao));
      }
    } else {
      dispatch(set_mensagem_string(msg_padrao));
    }
  };
};

export const set_mensagem_string = mensagem => {
  return {
    type: SET_MENSAGEM,
    payload: mensagem,
  };
};
