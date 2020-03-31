import { SET_MENSAGEM } from '../actions/actionTypes';

const initialState = {
  message: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MENSAGEM:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
