import React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import DisposicaoAtual from '../screens/DisposicaoAtual';
import { header, BotaoDrawer } from './utils';
import DetalharViagem from '../screens/DetalharViagem';

export default createStackNavigator(
  {
    DisposicaoAtual: {
      screen: DisposicaoAtual,
    },
    ViagemDetalhes: {
      screen: DetalharViagem,
    },
  },
  {
    initialRouteName: 'DisposicaoAtual',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: ({ navigation }) => ({
      ...header,
      headerRight: <BotaoDrawer navigationProps={navigation} />,
    }),
  },
);
