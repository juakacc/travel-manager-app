import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Home';
import IniciarViagem from '../screens/IniciarViagem';
import ConcluirViagem from '../screens/ConcluirViagem';
import { header, BotaoDrawer } from './utils';
import RegisterSupply from '../screens/RegisterSupply';
import RegisterService from '../screens/RegisterService';

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
    RegisterSupply: {
      screen: RegisterSupply,
    },
    RegisterService: {
      screen: RegisterService,
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
