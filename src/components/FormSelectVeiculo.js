import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PushNotification from 'react-native-push-notification';

import Botao from './Botao';
import commonStyles from '../commonStyles';

export default class FormSelectVeiculo extends React.Component {
  enviarVeiculo = () => {
    this.props.navigation.navigate('SelecionarVeiculo');

    PushNotification.localNotification({
      channelId: "notify-local", // (required) channelId, if the channel doesn't exist, notification will not trigger.
      title: "Título da notificação", // (optional)
      message: "Olá pessoal massa", // (required)
      // repeatType: 'time',
      // repeatTime: 5000,
      // bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
    });
    PushNotification.cancelAllLocalNotifications();
  };

  

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Inicie uma viagem</Text>
        <View>
          <Botao
            onPress={this.enviarVeiculo}
            title="Pegar Veículo"
            name="key"
            color={commonStyles.colors.gray.white}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: commonStyles.colors.secondary.main,
    borderRadius: 5,
    marginVertical: 5,
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
});
