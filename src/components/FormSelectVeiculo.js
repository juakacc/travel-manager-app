import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Botao from './Botao';
import commonStyles from '../commonStyles';

export default class FormSelectVeiculo extends React.Component {
  enviarVeiculo = () => {
    this.props.navigation.navigate('SelecionarVeiculo');
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
