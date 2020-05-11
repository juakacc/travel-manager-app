import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';

const Stack = createStackNavigator();

export default function LoginStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen component={Login} name="Login" />
    </Stack.Navigator>
  );
}
