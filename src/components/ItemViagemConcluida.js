import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import commonStyles from '../commonStyles';

class ItemViagemConcluida extends React.Component {
  detalharViagem = () => {
    this.props.navigation.navigate('ViagemDetalhes', {
      idViagem: this.props.viagem.id,
    });
  };

  render() {
    return (
      <TouchableOpacity
        style={[styles.container]}
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: commonStyles.colors.secondary.main,
    borderWidth: 2,
  },
  viewVeiculo: {
    flex: 1,
    alignItems: 'center',
  },
  viewMotorista: {
    flex: 1,
    alignItems: 'center',
  },
  veiculo: {
    color: commonStyles.colors.secondary.main,
    fontSize: 14,
  },
  motorista: {
    color: commonStyles.colors.secondary.main,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ItemViagemConcluida;
