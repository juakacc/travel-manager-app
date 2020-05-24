import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function PullRefresh(props) {
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
  },
});
