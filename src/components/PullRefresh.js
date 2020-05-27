import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import commonStyles from '../commonStyles';

export default function PullRefresh() {
  return (
    <Text style={styles.textoAviso}>
      Puxe <Icon name="arrow-down" /> para atualizar
    </Text>
  );
}

const styles = StyleSheet.create({
  textoAviso: {
    alignSelf: 'center',
    marginBottom: 5,
    color: commonStyles.colors.secondary.main,
  },
});
