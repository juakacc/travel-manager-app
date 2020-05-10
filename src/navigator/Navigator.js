import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from '../screens/Login';
import Relatorio from '../screens/Relatorio';
import CadastrarPessoa from '../screens/CadastrarPessoa';
import CadastrarVeiculo from '../screens/CadastrarVeiculo';
import DetalharViagem from '../screens/DetalharViagem';
import Sobre from '../screens/Sobre';
import ListPessoas from '../screens/ListPessoas';
import ListVeiculos from '../screens/ListVeiculos';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { header, BotaoVoltar, BotaoDrawer } from './utils';
import LogoutStackNavigator from './LogoutStackNavigator';
import DisposicaoAtualStack from './DisposicaoAtualStack';
import ViagemStack from './ViagemStack';
import commonStyles from '../commonStyles';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function RelatorioStack() {
  return (
    <Stack.Navigator initialRouteName="Relatorio">
      <Stack.Screen component={Relatorio} name="Relatorio" />
      <Stack.Screen component={DetalharViagem} name="ViagemDetalhes" />
    </Stack.Navigator>
  );
}

function HomeBottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen component={ViagemStack} name="Home" />
      <Tab.Screen component={DisposicaoAtualStack} name="Disposicao" />
      <Tab.Screen component={RelatorioStack} name="Viagens" />
    </Tab.Navigator>
  );
}

function PessoasStack() {
  return (
    <Stack.Navigator initialRouteName="PessoasScreen">
      <Stack.Screen component={ListPessoas} name="PessoasScreen" />
      <Stack.Screen component={CadastrarPessoa} name="CadastrarPessoa" />
    </Stack.Navigator>
  );
}

function VeiculoStack() {
  return (
    <Stack.Navigator initialRouteName="VeiculosScreen">
      <Stack.Screen component={ListVeiculos} name="VeiculosScreen" />
      <Stack.Screen component={CadastrarVeiculo} name="CadastrarVeiculo" />
    </Stack.Navigator>
  );
}

export function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen component={HomeBottomTabNavigator} name="Home" />
      <Drawer.Screen component={PessoasStack} name="Pessoas" />
      <Drawer.Screen component={VeiculoStack} name="Veiculos" />
      <Drawer.Screen component={Sobre} name="Sobre" />
      <Drawer.Screen component={LogoutStackNavigator} name="Logout" />
    </Drawer.Navigator>
  );
}

export function LoginStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen component={Login} name="Login" />
    </Stack.Navigator>
  );
}

// export default function Navigation() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {false ? (
//           <>
//             <Stack.Screen component={DrawerNavigator} name="App" />
//           </>
//         ) : (
//           <Stack.Screen component={LoginStack} name="Auth" />
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
