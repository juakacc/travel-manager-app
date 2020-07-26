import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Admin from './NavigatorAdmin';
import Motorista from './NavigatorMotorista';

const Stack = createStackNavigator();

export default function getNavigator(admin, apelido) {
  return admin ? (
    <Stack.Screen component={Admin} name="App" initialParams={{ apelido }} />
  ) : (
    <Stack.Screen
      component={Motorista}
      name="App"
      initialParams={{ apelido }}
    />
  );
}
