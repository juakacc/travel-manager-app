import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Logout from '../screens/Logout';
import { headerOptions } from './utils';

const Stack = createStackNavigator();

export default function () {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        ...headerOptions(navigation, true),
      })}
    >
      <Stack.Screen component={Logout} name="Logout" />
    </Stack.Navigator>
  );
}
