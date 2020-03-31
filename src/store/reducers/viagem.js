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
} from '../actions/actionTypes';

const initialState = {
  viagem: null,
  viagens_concluidas: [],
  viagens_nao_concluidas: [],
  viagens_filtradas: [],
  isLoading: false,
  isSubmetendo: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INICIAR_VIAGEM:
      return {
        ...state,
        viagem: action.payload,
      };
    case CONCLUIR_VIAGEM:
      return {
        ...state,
        viagem: null,
      };
    case SET_VIAGEM:
      return {
        ...state,
        viagem: action.payload,
      };
    case LOAD_VIAGENS_NAO_CONCLUIDAS:
      return {
        ...state,
        viagens_nao_concluidas: action.payload,
      };
    case LOAD_VIAGENS_CONCLUIDAS:
      return {
        ...state,
        viagens_concluidas: action.payload,
      };
    case SET_VIAGENS_FILTRADAS:
      return {
        ...state,
        viagens_filtradas: action.payload,
      };
    case INICIANDO_VIAGEM:
      return {
        ...state,
        isLoading: true,
      };
    case VIAGEM_INICIADA:
      return {
        ...state,
        isLoading: false,
      };
    case SUBMETENDO:
      return {
        ...state,
        isSubmetendo: true,
      };
    case SUBMETIDO:
      return {
        ...state,
        isSubmetendo: false,
      };
    default:
      return state;
  }
};

export default reducer;
