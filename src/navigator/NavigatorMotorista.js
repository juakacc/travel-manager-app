import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Sobre from '../screens/Sobre';
import ListVeiculos from '../screens/ListVeiculos';
import CadastrarPessoa from '../screens/CadastrarPessoa';

import { headerOptions } from './utils';
import DisposicaoAtualStack from './DisposicaoAtualStack';
import ViagemStack from './ViagemStack';
import LogoutStack from './LogoutStack';
import tabBarOptions from './tabBarOptions';
import commonStyles from '../commonStyles';
import CustomDrawerContent from './TitleDrawer';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function PessoasStack() {
  return (
    <Stack.Navigator
      initialRouteName="PessoasScreen"
      screenOptions={({ navigation }) => ({
        ...headerOptions(navigation, true),
      })}
    >
      <Stack.Screen
        component={CadastrarPessoa}
        name="CadastrarPessoa"
        initialParams={{
          editThis: true,
        }}
      />
    </Stack.Navigator>
  );
}

function VeiculoStack() {
  return (
    <Stack.Navigator
      initialRouteName="VeiculosScreen"
      screenOptions={({ navigation }) => ({
        ...headerOptions(navigation, true),
      })}
    >
      <Stack.Screen component={ListVeiculos} name="VeiculosScreen" />
    </Stack.Navigator>
  );
}

function HomeBottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        ...tabBarOptions,
      }}
    >
      <Tab.Screen
        component={ViagemStack}
        name="Home"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-car" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={DisposicaoAtualStack}
        name="Disposicao"
        options={{
          title: 'Viagens',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-body" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function DrawerNavigator({ route }) {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerContentOptions={{
        activeTintColor: commonStyles.colors.secondary.main,
      }}
      drawerContent={props => (
        <CustomDrawerContent {...props} {...route.params} />
      )}
      drawerStyle={{
        width: 200,
        height: '85%',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        elevation: 5,
      }}
    >
      <Drawer.Screen
        component={HomeBottomTabNavigator}
        name="Home"
        options={{
          title: 'Tela Inicial',
          drawerIcon: ({ color }) => (
            <Ionicons name="ios-home" size={25} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        component={VeiculoStack}
        name="Veiculos"
        options={{
          title: 'Veículos',
          drawerIcon: ({ color }) => (
            <Ionicons name="ios-car" size={25} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        component={PessoasStack}
        name="Pessoas"
        options={{
          title: 'Atualizar Dados',
          drawerIcon: ({ color }) => (
            <Ionicons name="ios-create" size={25} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        component={Sobre}
        name="Sobre"
        options={{
          title: 'Sobre o App',
          drawerIcon: () => (
            <Ionicons name="ios-help-circle-outline" size={25} color="#00f" />
          ),
        }}
      />
      <Drawer.Screen
        component={LogoutStack}
        name="Logout"
        options={{
          title: 'Sair',
          drawerIcon: () => (
            <Ionicons
              name="ios-power"
              size={25}
              color={commonStyles.colors.danger}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
