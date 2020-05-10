import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import IniciarViagem from '../screens/IniciarViagem';
import ConcluirViagem from '../screens/ConcluirViagem';
import { header, BotaoDrawer } from './utils';
import RegisterSupply from '../screens/RegisterSupply';
import RegisterService from '../screens/RegisterService';

const Stack = createStackNavigator();

export default function () {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Home} name="Viagem" />
      <Stack.Screen component={IniciarViagem} name="IniciarViagem" />
      <Stack.Screen component={ConcluirViagem} name="ConcluirViagem" />
      <Stack.Screen component={RegisterSupply} name="RegisterSupply" />
      <Stack.Screen component={RegisterService} name="RegisterService" />
    </Stack.Navigator>
  );
}
// export default createStackNavigator(
//   {
//     Viagem: {
//       screen: Home,
//     },
//     IniciarViagem: {
//       screen: IniciarViagem,
//     },
//     ConcluirViagem: {
//       screen: ConcluirViagem,
//     },
//     RegisterSupply: {
//       screen: RegisterSupply,
//     },
//     RegisterService: {
//       screen: RegisterService,
//     },
//   },
//   {
//     initialRouteName: 'Viagem',
//     headerLayoutPreset: 'center',
//     defaultNavigationOptions: ({ navigation }) => ({
//       ...header,
//       headerRight: <BotaoDrawer navigationProps={navigation} />,
//     }),
//   },
// );
