import React from 'react';
import { Text, StyleSheet } from 'react-native';
import commonStyles from '../commonStyles';

export default function Titulo({ titulo }) {
  return <Text style={styles.titulo}>{titulo}</Text>;
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: commonStyles.colors.secondary.main,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
});
