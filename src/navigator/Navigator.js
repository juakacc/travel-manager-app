import React from 'react';

import Login from '../screens/Login';
import Relatorio from '../screens/Relatorio';
import Splash from '../screens/LoginOuApp';
import CadastrarPessoa from '../screens/CadastrarPessoa';
import CadastrarVeiculo from '../screens/CadastrarVeiculo';
import DetalharViagem from '../screens/DetalharViagem';
import Sobre from '../screens/Sobre';
import ListPessoas from '../screens/ListPessoas';
import ListVeiculos from '../screens/ListVeiculos';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { header, BotaoVoltar, BotaoDrawer } from './utils';
import LogoutStackNavigator from './LogoutStackNavigator';
import DisposicaoAtualStack from './DisposicaoAtualStack';
import ViagemStack from './ViagemStack';

const RelatorioStack = createStackNavigator(
  {
    Relatorio: {
      screen: Relatorio,
    },
    ViagemDetalhes: {
      screen: DetalharViagem,
    },
  },
  {
    initialRouteName: 'Relatorio',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: ({ navigation }) => ({
      ...header,
      headerRight: <BotaoDrawer navigationProps={navigation} />,
    }),
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
    Disposicao: {
      screen: DisposicaoAtualStack,
      navigationOptions: {
        title: 'Viagens',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-body" size={30} color={tintColor} />
        ),
      },
    },
    Viagens: {
      screen: RelatorioStack,
      navigationOptions: {
        title: 'Relatórios',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-albums" size={30} color={tintColor} />
        ),
      },
    },
  },
  {},
);

const PessoasStack = createStackNavigator(
  {
    PessoasScreen: {
      screen: ListPessoas,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <BotaoVoltar navigationProps={navigation} />,
      }),
    },
    CadastrarPessoa: {
      screen: CadastrarPessoa,
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
    CadastrarVeiculo: {
      screen: CadastrarVeiculo,
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
    Pessoas: {
      screen: PessoasStack,
      navigationOptions: {
        drawerLabel: 'Pessoas',
        drawerIcon: ({ tintColor }) => (
          <Ionicons name="ios-person-add" size={25} color={tintColor} />
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
