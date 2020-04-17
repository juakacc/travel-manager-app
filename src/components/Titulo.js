import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function (props) {
  return <Text style={styles.titulo}>{props.titulo}</Text>;
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});
