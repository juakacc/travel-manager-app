import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Logout from '../screens/Logout';
import { header, BotaoVoltar } from './utils';
// import { createStackNavigator } from 'react-navigation-stack';

const Stack = createStackNavigator();

export default function () {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Logout} name="Logout" />
    </Stack.Navigator>
  );
}

// export default createStackNavigator(
//   {
//     Logout: {
//       screen: Logout,
//     },
//   },
//   {
//     headerLayoutPreset: 'center',
//     defaultNavigationOptions: ({ navigation }) => ({
//       ...header,
//       headerLeft: <BotaoVoltar navigationProps={navigation} />,
//     }),
//   },
// );
