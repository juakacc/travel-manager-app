import React, { Component } from 'react';
import { ToastAndroid } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { connect } from 'react-redux';
import { setMensagem } from './store/actions/mensagem';
import { userLogged } from './store/actions/user';
import Login from './screens/Login';
import getNavigator from './navigator';

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
              getNavigator(user.permissoes.includes('admin'), user.apelido)
            ) : (
              <Stack.Screen component={Login} name="Login" />
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
