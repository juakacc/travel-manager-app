import {
  CARREGANDO_VEICULO,
  VEICULO_CARREGADO,
  SET_VEICULOS_DISPONIVEIS,
  SUBMETENDO,
  SUBMETIDO,
} from '../actions/actionTypes';

const estadoInicial = {
  veiculos_disponiveis: [],
  veiculos: [],
  isLoading: false,
  isSubmetendo: false,
};

const reducer = (prevState = estadoInicial, action) => {
  switch (action.type) {
    case CARREGANDO_VEICULO:
      return {
        ...prevState,
        isLoading: true,
      };
    case VEICULO_CARREGADO:
      return {
        ...prevState,
        isLoading: false,
      };
    case SET_VEICULOS_DISPONIVEIS:
      return {
        ...prevState,
        veiculos_disponiveis: action.payload,
      };
    case SUBMETENDO:
      return {
        ...prevState,
        isSubmetendo: true,
      };
    case SUBMETIDO:
      return {
        ...prevState,
        isSubmetendo: false,
      };
    default:
      return prevState;
  }
};

export default reducer;
