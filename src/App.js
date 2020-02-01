import React, { Component } from 'react';

import Navigator from './Navigator'
import { Provider } from 'react-redux';
import storeConfig from './store/storeConfig'

export default class App extends Component {

  render () {
    
    const storeFunction = storeConfig()

    return (
      <Provider store={storeFunction}>
        <Navigator />
      </Provider>
    );
  }  
};