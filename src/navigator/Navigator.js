import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Login from '../screens/Login';
import Relatorio from '../screens/Relatorio';
import CadastrarPessoa from '../screens/CadastrarPessoa';
import CadastrarVeiculo from '../screens/CadastrarVeiculo';
import DetalharViagem from '../screens/DetalharViagem';
import Sobre from '../screens/Sobre';
import ListPessoas from '../screens/ListPessoas';
import ListVeiculos from '../screens/ListVeiculos';

import { headerOptions } from './utils';
import LogoutStackNavigator from './LogoutStackNavigator';
import DisposicaoAtualStack from './DisposicaoAtualStack';
import ViagemStack from './ViagemStack';
import commonStyles from '../commonStyles';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function RelatorioStack() {
  return (
    <Stack.Navigator
      initialRouteName="Relatorio"
      screenOptions={({ navigation }) => ({
        ...headerOptions(navigation),
      })}
    >
      <Stack.Screen component={Relatorio} name="Relatorio" />
      <Stack.Screen component={DetalharViagem} name="ViagemDetalhes" />
    </Stack.Navigator>
  );
}

function HomeBottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#fff',
        inactiveTintColor: '#4F2500',
        labelStyle: {
          fontSize: 14,
        },
        style: {
          backgroundColor: commonStyles.colors.secundaria,
          paddingVertical: 10,
          height: 70,
          marginTop: 5,
        },
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
      <Tab.Screen
        component={RelatorioStack}
        name="Viagens"
        options={{
          title: 'Relatórios',
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-albums" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function PessoasStack() {
  return (
    <Stack.Navigator
      initialRouteName="PessoasScreen"
      screenOptions={({ navigation }) => ({
        ...headerOptions(navigation, true),
      })}
    >
      <Stack.Screen component={ListPessoas} name="PessoasScreen" />
      <Stack.Screen component={CadastrarPessoa} name="CadastrarPessoa" />
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
      <Stack.Screen component={CadastrarVeiculo} name="CadastrarVeiculo" />
    </Stack.Navigator>
  );
}

export function DrawerNavigator() {
  return (
    <Drawer.Navigator drawerPosition="right">
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
        component={PessoasStack}
        name="Pessoas"
        options={{
          title: 'Pessoas',
          drawerIcon: ({ color }) => (
            <Ionicons name="ios-person-add" size={25} color={color} />
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
        component={LogoutStackNavigator}
        name="Logout"
        options={{
          title: 'Sair',
          drawerIcon: () => (
            <Ionicons name="ios-power" size={25} color="#f00" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export function LoginStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen component={Login} name="Login" />
    </Stack.Navigator>
  );
}
