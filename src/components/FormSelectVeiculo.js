import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Botao from './Botao';
import RNPickerSelect from 'react-native-picker-select';
import { Alert } from 'react-native';
import commonStyles from '../commonStyles';

export default class FormSelectVeiculo extends React.Component {
  state = {
    veiculoSelec: null,
  };

  componentDidMount = () => {
    this._focusListener = this.props.navigation.addListener('focus', () => {
      this.setState({ veiculoSelec: null });
    });
  };

  componentWillUnmount() {
    this._focusListener();
  }

  enviarVeiculo = () => {
    if (this.state.veiculoSelec) {
      this.props.navigation.navigate('IniciarViagem', {
        idVeiculo: this.state.veiculoSelec,
      });
    } else {
      Alert.alert('Aviso', 'Selecione um veículo, por favor!');
    }
  };

  render() {
    const placeholder = {
      label: 'Selecione um veículo...',
      value: null,
      color: '#9EA0A4',
    };

    const { veiculos } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Veículos disponíveis:</Text>

        {veiculos.length > 0 ? (
          <View>
            <RNPickerSelect
              onValueChange={value => this.setState({ veiculoSelec: value })}
              value={this.state.veiculoSelec}
              // useNativeAndroidPickerStyle={false}
              placeholder={placeholder}
              items={this.props.veiculos.map(veiculo => {
                return {
                  label: veiculo.nome,
                  value: veiculo.id,
                };
              })}
            />
            <Botao
              onPress={this.enviarVeiculo}
              title="Pegar Veículo"
              name="key"
              color={commonStyles.colors.gray.white}
            />
          </View>
        ) : (
          <Text style={styles.txtSemVeiculo}>
            Nenhum veículo disponível no momento. Aguarde (ou atualize a página)
            até que um esteja disponível
          </Text>
        )}
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
    paddingVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
  veiculo: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  txtInfo: {
    textAlign: 'center',
    color: commonStyles.colors.danger,
  },
  txtSemVeiculo: {
    margin: 10,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
