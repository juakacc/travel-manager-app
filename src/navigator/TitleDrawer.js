import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';
import commonStyles from '../commonStyles';

export default function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Text style={styles.saudacao}>Bem-vindo!</Text>
        <Text style={styles.apelido}>{props.apelido}</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saudacao: {
    fontWeight: 'bold',
    fontSize: 15,
    color: commonStyles.colors.secondary.main,
  },
  apelido: {
    fontSize: 15,
    color: commonStyles.colors.secondary.main,
  },
});
