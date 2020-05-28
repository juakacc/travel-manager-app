import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import IniciarViagem from '../screens/IniciarViagem';
import ConcluirViagem from '../screens/ConcluirViagem';
import { headerOptions } from './utils';
import RegisterSupply from '../screens/RegisterSupply';
import RegisterService from '../screens/RegisterService';
import ListRevisions from '../screens/ListRevisions';
import SelecionarVeiculo from '../screens/SelecionarVeiculo';

const Stack = createStackNavigator();

export default function () {
  return (
    <Stack.Navigator
      initialRouteName="Viagem"
      mode="card"
      screenOptions={({ navigation }) => ({
        ...headerOptions(navigation),
      })}
    >
      <Stack.Screen component={Home} name="Viagem" />
      <Stack.Screen component={SelecionarVeiculo} name="SelecionarVeiculo" />
      <Stack.Screen component={IniciarViagem} name="IniciarViagem" />
      <Stack.Screen component={ConcluirViagem} name="ConcluirViagem" />
      <Stack.Screen component={RegisterSupply} name="RegisterSupply" />
      <Stack.Screen component={RegisterService} name="RegisterService" />
      <Stack.Screen component={ListRevisions} name="ListRevisions" />
    </Stack.Navigator>
  );
}
