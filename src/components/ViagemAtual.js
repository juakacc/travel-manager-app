import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import functions from '../functions';
import commonStyles from '../commonStyles';

export default function ViagemAtual({ viagem }) {
  if (viagem) {
    return (
      <View style={styles.detalhesView}>
        <Text style={styles.txtDetalhes}>Detalhes da viagem #{viagem.id}</Text>

        <Text style={styles.infoTitle}>Momento da saída: </Text>
        <Text style={styles.infoValue}>
          {functions.getDateTimeString(viagem.saida)}
        </Text>

        <Text style={styles.infoTitle}>KM registrado na saída: </Text>
        <Text>{functions.formatNumber(viagem.km_inicial)} KM</Text>
      </View>
    );
  } else {
    return (
      <View style={[styles.detalhesView, styles.semResultado]}>
        <Text style={styles.txtSemResultado}>Sem viagem no momento</Text>
        <Icon
          name="home"
          size={50}
          color={commonStyles.colors.secondary.main}
        />
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
    color: commonStyles.colors.secondary.main,
  },
});
