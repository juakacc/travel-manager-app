import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Home from '../screens/Home';
import IniciarViagem from '../screens/IniciarViagem';
import ConcluirViagem from '../screens/ConcluirViagem';
import { headerOptions } from './utils';
import RegisterSupply from '../screens/RegisterSupply';
import RegisterService from '../screens/RegisterService';

const Stack = createStackNavigator();

export default function () {
  return (
    <Stack.Navigator
      initialRouteName="Viagem"
      mode="card"
      screenOptions={({ navigation }) => ({
        ...headerOptions(navigation),
        // headerLeft: () => (
        //   <Icon
        //     name="arrow-left"
        //     size={25}
        //     style={{ marginLeft: 20 }}
        //     onPress={() => navigation.goBack()}
        //   />
        // ),
      })}
    >
      <Stack.Screen component={Home} name="Viagem" />
      <Stack.Screen component={IniciarViagem} name="IniciarViagem" />
      <Stack.Screen component={ConcluirViagem} name="ConcluirViagem" />
      <Stack.Screen component={RegisterSupply} name="RegisterSupply" />
      <Stack.Screen component={RegisterService} name="RegisterService" />
    </Stack.Navigator>
  );
}
