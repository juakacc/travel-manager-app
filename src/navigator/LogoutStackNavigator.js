import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Logout from '../screens/Logout';
import { headerOptions } from './utils';
import LoginStack from './LoginStack';

const Stack = createStackNavigator();

export default function () {
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={Logout}
        name="Logout"
        options={({ navigation }) => ({
          ...headerOptions(navigation, true),
        })}
      />
      <Stack.Screen component={LoginStack} name="Login" />
    </Stack.Navigator>
  );
}
