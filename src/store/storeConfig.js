import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import userReducer from './reducers/user'
import messageReducer from './reducers/mensagem'

const reducers = combineReducers({
    // onde ficarao os reducers
    user: userReducer,
    message: messageReducer
})

const storeConfig = () => {
    return createStore(reducers, compose(applyMiddleware(thunk)))
}

export default storeConfig