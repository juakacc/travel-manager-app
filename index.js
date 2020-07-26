import 'react-native-gesture-handler';
import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

import storeConfig from './src/store/storeConfig';
import { Provider } from 'react-redux';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import conf from './src/conf';
import GeneralStatusBarColor from './src/components/GeneralStatusBarColor';
import commonStyles from './src/commonStyles';

axios.defaults.baseURL = conf.baseurl;
axios.defaults.headers.post['Content-Type'] = 'application/json';

const configureToken = async () => {
  const json = await AsyncStorage.getItem('userData');
  const userData = JSON.parse(json) || {};

  if (userData.token) {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${userData.token}`,
    };
  }
};

configureToken();

const storeFunction = storeConfig();

const Redux = () => (
  <Provider store={storeFunction}>
    <GeneralStatusBarColor
      backgroundColor={commonStyles.colors.secondary.main}
      barStyle="ligth-content"
    />
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Redux);
