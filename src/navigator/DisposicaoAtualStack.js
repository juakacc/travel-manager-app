import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DisposicaoAtual from '../screens/DisposicaoAtual';
import { headerOptions } from './utils';
import DetalharViagem from '../screens/DetalharViagem';
import DetailVehicle from '../screens/DetailVehicle';
import CadastrarVeiculo from '../screens/CadastrarVeiculo';

const Stack = createStackNavigator();

export default function () {
  return (
    <Stack.Navigator
      initialRouteName="DisposicaoAtual"
      screenOptions={({ navigation }) => ({
        ...headerOptions(navigation),
      })}
    >
      <Stack.Screen component={DisposicaoAtual} name="DisposicaoAtual" />
      <Stack.Screen component={DetalharViagem} name="ViagemDetalhes" />
      <Stack.Screen component={DetailVehicle} name="DetailVehicle" />
      <Stack.Screen component={CadastrarVeiculo} name="CadastrarVeiculo" />
    </Stack.Navigator>
  );
}
