import React from 'react';
import { Text, StyleSheet } from 'react-native';
import commonStyles from '../commonStyles';

export default function (props) {
  return <Text style={styles.titulo}>{props.titulo}</Text>;
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: commonStyles.colors.secondary.main,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});
