import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Home';
import IniciarViagem from '../screens/IniciarViagem';
import ConcluirViagem from '../screens/ConcluirViagem';
import { header, BotaoDrawer } from './utils';
import NewToFuel from '../screens/NewToFuel';

export default createStackNavigator(
  {
    Viagem: {
      screen: Home,
    },
    IniciarViagem: {
      screen: IniciarViagem,
    },
    ConcluirViagem: {
      screen: ConcluirViagem,
    },
    AbastecerVeiculo: {
      screen: NewToFuel,
    },
  },
  {
    initialRouteName: 'Viagem',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: ({ navigation }) => ({
      ...header,
      headerRight: <BotaoDrawer navigationProps={navigation} />,
    }),
  },
);
