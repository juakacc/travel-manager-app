import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class ItemViagemConcluida extends React.Component {
  detalharViagem = () => {
    this.props.navigation.navigate('ViagemDetalhes', {
      idViagem: this.props.viagem.id,
    });
  };

  render() {
    const color = this.props.viagem.chegada ? '#A9F5A9' : '#A9BCF5';

    return (
      <TouchableOpacity
        style={[styles.container, { backgroundColor: color }]}
        onPress={this.detalharViagem}
      >
        <View style={styles.viewVeiculo}>
          <Text style={styles.veiculo}>[{this.props.viagem.veiculo.nome}]</Text>
        </View>
        <View style={styles.viewMotorista}>
          <Text style={styles.motorista}>
            {this.props.viagem.motorista.apelido}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 3,
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  viewVeiculo: {
    flex: 1,
    alignItems: 'center',
  },
  viewMotorista: {
    flex: 1,
    alignItems: 'center',
  },
  motorista: {
    fontWeight: 'bold',
  },
});

export default ItemViagemConcluida;
