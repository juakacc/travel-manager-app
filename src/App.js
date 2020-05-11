import React, { Component } from 'react';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginStack, DrawerNavigator } from './navigator/Navigator';
// import NavigatorMotorista from './navigator/NavigatorMotorista';
// import NavigatorService from './navigator/NavigatorService';

import { connect } from 'react-redux';
import { setMensagem } from './store/actions/mensagem';
import { ToastAndroid } from 'react-native';

import { userLogged } from './store/actions/user';

const Stack = createStackNavigator();

class App extends Component {
  componentDidUpdate = () => {
    if (this.props.message && this.props.message.toString().trim()) {
      ToastAndroid.show(this.props.message, ToastAndroid.SHORT);
      this.props.clearMessage();
    }
  };

  componentDidMount = async () => {
    const json = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(json) || {};

    if (userData.token) {
      this.props.onUserLogged(userData);
    }
  };

  render() {
    const { user } = this.props;

    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            {user.token ? (
              <Stack.Screen component={DrawerNavigator} name="App" />
            ) : (
              <Stack.Screen component={LoginStack} name="Auth" />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

const mapStateToProps = ({ mensagem, user }) => {
  return {
    message: mensagem.message,
    user: user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearMessage: () => dispatch(setMensagem('')),
    onUserLogged: user => dispatch(userLogged(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
