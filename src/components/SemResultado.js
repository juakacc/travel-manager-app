import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import commonStyles from '../commonStyles';

export default function SemResultado(props) {
  return (
    <View style={styles.viewSemResultado}>
      <Text style={styles.txtSemResultado}>Nenhum resultado encontrado</Text>
      <Icon
        name="frown-open"
        size={50}
        color={commonStyles.colors.secondary.main}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewSemResultado: {
    alignItems: 'center',
    marginTop: 10,
  },
  txtSemResultado: {
    fontSize: 18,
    marginBottom: 10,
    color: commonStyles.colors.secondary.main,
  },
});
