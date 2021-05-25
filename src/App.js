import React, { useEffect } from 'react';
import { ToastAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';

import { connect } from 'react-redux';
import { notificar_esp, NTF_ESPECIFICO } from "./notifications";
import { setMensagem } from './store/actions/mensagem';
import { userLogged } from './store/actions/user';
import Login from './screens/Login';
import getNavigator from './navigator';

const Stack = createStackNavigator();

function App({ user, message, ...props }) {

  useEffect(async () => {
    const json = await AsyncStorage.getItem('userData');
    const userData = JSON.parse(json) || {};

    if (userData.token) {
      props.onUserLogged(userData);
    }
  }, []);

  useEffect(() => {
    if (message && message.toString().trim()) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
      props.clearMessage();
    }
  });

  const saveToken = async token => {
    const local = await AsyncStorage.getItem('tokenFCM');
    let send = false;

    if (local) {
      if (local != token) {
        send = true;
      }
    } else {
      send = true;
    }

    if (send) {
      axios.post('/login/save-token', { token })
      .then(res => {
        console.log('Salvando token localmente: ' + res.data.token);
        AsyncStorage.setItem('tokenFCM', res.data.token);
      })
      .catch(err => {
        console.log('Ocorreu um erro ao salvar um token!');
      })
    }
  }

  useEffect(() => {
    messaging().getToken()
    .then(token => {
      return saveToken(token);
    })
    .catch(err => {
      console.log('erro na recuperacao de token: ' + err);
    })

    return messaging().onTokenRefresh(token => {
      saveToken(token);
    });
  }, []);

  useEffect(() => {
    // recebendo notificações remotas
    return messaging().onMessage(async remoteMessage => {
      notificar_esp(NTF_ESPECIFICO, remoteMessage.notification.title, remoteMessage.notification.body);
    });
  }, []);

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
