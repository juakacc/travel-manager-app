import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import userReducer from './reducers/user'
import messageReducer from './reducers/mensagem'
import viagemReducer from './reducers/viagem'
import veiculoReducer from './reducers/veiculo'

const reducers = combineReducers({
    user: userReducer,
    viagem: viagemReducer,
    mensagem: messageReducer,
    veiculo: veiculoReducer
})

const storeConfig = () => {
    return createStore(reducers, applyMiddleware(thunk))
}

export default storeConfig