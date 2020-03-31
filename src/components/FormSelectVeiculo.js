import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Botao from './Botao';
import RNPickerSelect from 'react-native-picker-select';

class FormSelectVeiculo extends React.Component {
  state = {
    veiculoSelec: null,
  };

  componentDidMount = () => {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.setState({ veiculoSelec: null });
    });
  };

  componentWillUnmount() {
    this.focusListener.remove();
  }

  enviarVeiculo = () => {
    if (this.state.veiculoSelec) {
      this.props.navigation.navigate('IniciarViagem', {
        idVeiculo: this.state.veiculoSelec,
      });
    }
  };

  render() {
    const placeholder = {
      label: 'Selecione um veículo...',
      value: null,
      color: '#9EA0A4',
    };

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Veículos disponíveis:</Text>

        {this.props.veiculos.length > 0 ? (
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
            />
            <Text style={styles.txtInfo}>
              Ao escolher um veículo será registrado o momento da saída
            </Text>
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

export default FormSelectVeiculo;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#000',
    margin: 5,
    padding: 5,
  },
  title: {
    fontWeight: 'bold',
  },
  veiculo: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  saida: {
    textAlign: 'center',
    color: '#666',
  },
  txtInfo: {
    textAlign: 'center',
    color: '#f00',
  },
  txtSemVeiculo: {
    margin: 10,
    textAlign: 'center',
  },
});
