import React, { Component } from 'react';

import Navigator from './navigator/Navigator';
import NavigatorMotorista from './navigator/NavigatorMotorista';
import NavigatorService from './navigator/NavigatorService';

import { connect } from 'react-redux';
import { setMensagem } from './store/actions/mensagem';
import { ToastAndroid } from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

class App extends Component {
  componentDidUpdate = () => {
    if (this.props.message && this.props.message.toString().trim()) {
      ToastAndroid.show(this.props.message, ToastAndroid.SHORT);
      this.props.clearMessage();
    }
  };

  render() {
    if (this.props.isAdmin) {
      return (
        <SafeAreaProvider>
          <Navigator
            ref={navigatorRef => {
              NavigatorService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </SafeAreaProvider>
      );
    } else {
      return (
        <SafeAreaProvider>
          <NavigatorMotorista
            ref={navigatorRef => {
              NavigatorService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </SafeAreaProvider>
      );
    }
  }
}

const mapStateToProps = ({ mensagem, user }) => {
  return {
    message: mensagem.message,
    isAdmin: user.permissoes.includes('admin'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearMessage: () => dispatch(setMensagem('')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
