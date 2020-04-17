import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import NumberFormat from 'react-number-format';
import Icon from 'react-native-vector-icons/FontAwesome5';

import functions from '../functions';

export default function ViagemAtual({ viagem }) {
  if (viagem) {
    return (
      <View style={styles.detalhesView}>
        <Text style={styles.txtDetalhes}>Detalhes da viagem</Text>

        <Text style={styles.infoTitle}>Momento da saída: </Text>
        <Text style={styles.infoValue}>
          {functions.getDateTimeString(viagem.saida)}
        </Text>

        <Text style={styles.infoTitle}>KM registrado na saída: </Text>
        <NumberFormat
          value={viagem.km_inicial}
          displayType={'text'}
          thousandSeparator={true}
          renderText={value => <Text style={styles.infoValue}>{value} KM</Text>}
        />
      </View>
    );
  } else {
    return (
      <View style={[styles.detalhesView, styles.semResultado]}>
        <Text style={styles.txtSemResultado}>Sem viagem no momento</Text>
        <Icon name="home" size={50} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detalhesView: {
    padding: 10,
  },
  txtDetalhes: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  infoValue: {
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 10,
  },
  semResultado: {
    alignItems: 'center',
  },
  txtSemResultado: {
    fontSize: 18,
    marginBottom: 10,
  },
});
