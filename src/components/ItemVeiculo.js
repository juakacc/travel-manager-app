import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import commonStyles from '../commonStyles';

export default function ItemVeiculo({ veiculo, navigation }) {
  const selecionar = () => {
    navigation.navigate('IniciarViagem', {
      idVeiculo: veiculo.id,
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={selecionar}>
      <Text style={styles.texto}>{veiculo.nome}</Text>
      <Icon
        name="arrow-right"
        color={commonStyles.colors.secondary.main}
        size={15}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 2,
    borderColor: commonStyles.colors.secondary.main,
    borderWidth: 2,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  texto: {
    color: commonStyles.colors.secondary.main,
  },
});
