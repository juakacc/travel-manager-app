import React from 'react';

import Logout from '../screens/Logout';
import { header, BotaoVoltar } from './utils';
import { createStackNavigator } from 'react-navigation-stack';

export default createStackNavigator(
  {
    Logout: {
      screen: Logout,
    },
  },
  {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: ({ navigation }) => ({
      ...header,
      headerLeft: <BotaoVoltar navigationProps={navigation} />,
    }),
  },
);
