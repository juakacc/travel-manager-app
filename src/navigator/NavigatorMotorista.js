import React from 'react';

import Login from '../screens/Login';
import Splash from '../screens/LoginOuApp';
import Sobre from '../screens/Sobre';
import ListVeiculos from '../screens/ListVeiculos';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { header, BotaoVoltar } from './utils';
import LogoutStackNavigator from './LogoutStackNavigator';
import DisposicaoAtualStack from './DisposicaoAtualStack';
import ViagemStack from './ViagemStack';
import CadastrarPessoa from '../screens/CadastrarPessoa';
import commonStyles from '../commonStyles';

const PessoasStack = createStackNavigator(
  {
    PessoasScreen: {
      screen: CadastrarPessoa,
      params: {
        editThis: true,
      },
      navigationOptions: ({ navigation }) => ({
        headerLeft: <BotaoVoltar navigationProps={navigation} />,
      }),
    },
  },
  {
    initialRouteName: 'PessoasScreen',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      ...header,
    },
  },
);

const VeiculoStack = createStackNavigator(
  {
    VeiculosScreen: {
      screen: ListVeiculos,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <BotaoVoltar navigationProps={navigation} />,
      }),
    },
  },
  {
    initialRouteName: 'VeiculosScreen',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      ...header,
    },
  },
);

const HomeBottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: ViagemStack,
      navigationOptions: {
        title: 'Início',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-car" size={30} color={tintColor} />
        ),
      },
    },
    Viagens: {
      screen: DisposicaoAtualStack,
      navigationOptions: {
        title: 'Viagens',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-body" size={30} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: '#4F2500',
      labelStyle: {
        fontSize: 14,
      },
      style: {
        backgroundColor: commonStyles.colors.secundaria,
        paddingVertical: 10,
        height: 70,
        marginTop: 10,
      },
    },
  },
);

const DrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeBottomTabNavigator,
      navigationOptions: {
        drawerLabel: 'Tela Inicial',
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="ios-home" size={25} color={tintColor} />
        ),
      },
    },
    Veiculos: {
      screen: VeiculoStack,
      navigationOptions: {
        drawerLabel: 'Veículos',
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="ios-car" size={25} color={tintColor} />
        ),
      },
    },
    Pessoas: {
      screen: PessoasStack,
      navigationOptions: {
        drawerLabel: 'Atualizar Dados',
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="ios-build" size={25} color={tintColor} />
        ),
      },
    },
    Sobre: {
      screen: Sobre,
      navigationOptions: {
        drawerLabel: 'Sobre o App',
        drawerIcon: () => (
          <Ionicons name="ios-help-circle-outline" size={25} color="blue" />
        ),
      },
    },
    Logout: {
      screen: LogoutStackNavigator,
      navigationOptions: {
        drawerLabel: 'Sair',
        drawerIcon: () => <Ionicons name="ios-power" size={25} color="red" />,
      },
    },
  },
  {
    drawerPosition: 'right',
  },
);

const SwitchNavigator = createSwitchNavigator(
  {
    Splash: {
      screen: Splash,
    },
    Auth: {
      screen: Login,
    },
    App: {
      screen: DrawerNavigator,
    },
  },
  {
    initialRouteName: 'Splash',
  },
);

export default createAppContainer(SwitchNavigator);
