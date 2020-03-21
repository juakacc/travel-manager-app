import React from 'react'

import Login from './screens/Login'
import Home from './screens/Home'
import ConcluirViagem from './screens/ConcluirViagem'
import IniciarViagem from './screens/IniciarViagem'
import Splash from './screens/LoginOuApp'
import Logout from './screens/Logout'
import DetalharViagem from './screens/DetalharViagem'
import Sobre from './screens/Sobre'
import ListPessoas from './screens/ListPessoas'
import ListVeiculos from './screens/ListVeiculos'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { header, BotaoVoltar, BotaoDrawer } from './Navigator'

const ViagemStackNavigator = createStackNavigator({
    Viagem: {
        screen: Home
    },
    IniciarViagem: {
        screen: IniciarViagem
    },
    ConcluirViagem: {
        screen: ConcluirViagem
    },
    ViagemDetalhes: {
        screen: DetalharViagem
    }
}, {
    initialRouteName: 'Viagem',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: ({ navigation }) => ({
        ...header,
        headerRight: <BotaoDrawer navigationProps={navigation} />
    })
})

const LogoutStackNavigator = createStackNavigator({
    Logout: {
        screen: Logout
    }
}, {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: ({ navigation }) => ({
        ...header,
        headerLeft: <BotaoVoltar navigationProps={navigation} />
    })
})

const PessoasStack = createStackNavigator({
    PessoasScreen: {
        screen: ListPessoas,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <BotaoVoltar navigationProps={navigation} />
        })
    }
}, {
    initialRouteName: 'PessoasScreen',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
        ...header
    }
})

const VeiculoStack = createStackNavigator({
    VeiculosScreen: {
        screen: ListVeiculos,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <BotaoVoltar navigationProps={navigation} />
        })
    }
}, {
    initialRouteName: 'VeiculosScreen',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
        ...header
    }
})

const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: ViagemStackNavigator,
        navigationOptions: {
            drawerLabel: 'Tela Inicial',
            drawerIcon: ({ tintColor }) => (<Ionicons name='ios-home' size={25} color={tintColor} />)
        }
    },
    Pessoas: {
        screen: PessoasStack,
        navigationOptions: {
            drawerLabel: 'Pessoas',
            drawerIcon: ({ tintColor }) => (<Ionicons name='ios-person-add' size={25} color={tintColor} />)
        }
    },
    Veiculos: {
        screen: VeiculoStack,
        navigationOptions: {
            drawerLabel: 'Veículos',
            drawerIcon: ({ tintColor }) => (<Ionicons name='ios-car' size={25} color={tintColor} />)
        }
    },
    Logout: {
        screen: LogoutStackNavigator,
        navigationOptions: {
            drawerLabel: 'Sair do App',
            drawerIcon: () => (<Ionicons name='ios-power' size={25} color='red' />)
        }
    },
    Sobre: {
        screen: Sobre,
        navigationOptions: {
            drawerLabel: 'Sobre o App',
            drawerIcon: () => (<Ionicons name='ios-help-circle-outline' size={25} color='blue' />)
        }
    }
}, {
    drawerPosition: "right"
})

const SwitchNavigator = createSwitchNavigator({
    Splash: {
        screen: Splash
    },
    Auth: {
        screen: Login
    },
    App: {
        screen: DrawerNavigator
    }
}, {
    initialRouteName: 'Splash'
})

export default createAppContainer(SwitchNavigator)