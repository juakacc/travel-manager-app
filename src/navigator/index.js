import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Admin from './NavigatorAdmin';
import Motorista from './NavigatorMotorista';

const Stack = createStackNavigator();

export default function getNavigator(admin) {
  return admin ? (
    <Stack.Screen component={Admin} name="App" />
  ) : (
    <Stack.Screen component={Motorista} name="App" />
  );
}
