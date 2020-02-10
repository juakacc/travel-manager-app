import React from 'react'
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import storeConfig from './src/store/storeConfig'
import { Provider } from 'react-redux';
import axios from 'axios'

axios.defaults.baseURL = 'http://107.21.5.22:8080/'

const storeFunction = storeConfig()

const Redux = () => (
    <Provider store={storeFunction}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => Redux);
