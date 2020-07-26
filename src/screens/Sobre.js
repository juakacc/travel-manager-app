import React from 'react';
import { View, StyleSheet, Text, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Botao from '../components/Botao';
import config from '../conf';
import commonStyles from '../commonStyles';

export default class Sobre extends React.Component {
  enviarMsg = () => {
    const msg = 'Dúvidas, sugestões e reclamações: ';
    Linking.openURL(`whatsapp://send?phone=${config.phone}&text=${msg}`);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>
          <Icon name="road" size={35} color={commonStyles.colors.gray.white} />{' '}
          Viagens PMO
        </Text>

        <Botao
          onPress={this.enviarMsg}
          title="Dúvidas, sugestões?"
          color={commonStyles.colors.gray.white}
        />

        <View style={styles.containerInfo}>
          <Text style={styles.texto}>
            <Icon name="registered" /> 2020 Geral.Info Soft
          </Text>
          <Text style={styles.texto}>Versão: {config.version}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: commonStyles.colors.secondary.main,
    padding: 20,
    justifyContent: 'space-around',
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: commonStyles.colors.gray.white,
  },
  containerInfo: {
    alignItems: 'center',
  },
  texto: {
    color: commonStyles.colors.gray.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
