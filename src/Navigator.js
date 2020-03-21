import React from 'react'

import Login from './screens/Login'
import Home from './screens/Home'
import Relatorio from './screens/Relatorio'
import ConcluirViagem from './screens/ConcluirViagem'
import IniciarViagem from './screens/IniciarViagem'
import Splash from './screens/LoginOuApp'
import CadastrarPessoa from './screens/CadastrarPessoa'
import CadastrarVeiculo from './screens/CadastrarVeiculo'
import Logout from './screens/Logout'
import DetalharViagem from './screens/DetalharViagem'
import Sobre from './screens/Sobre'
import ListPessoas from './screens/ListPessoas'
import ListVeiculos from './screens/ListVeiculos'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'

import { Text, View } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import commonStyles from './commonStyles'

const Header = () => {
    return (
        <View>
            <Text style={{ fontSize: 24 }}><Icon name="road" size={30} color="#a50" /> Viagens PMO</Text>
        </View>
    )
}

export const header = {
    headerTitle: () => <Header />,
    headerStyle: {
        backgroundColor: commonStyles.colors.principal,
    }
}

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

const RelatorioStack = createStackNavigator({
    Relatorio: {
        screen: Relatorio
    },
    ViagemDetalhes: {
        screen: DetalharViagem
    }
}, {
    initialRouteName: 'Relatorio',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: ({ navigation }) => ({
        ...header,
        headerRight: <BotaoDrawer navigationProps={navigation} />
    })
})

const HomeBottomTabNavigator = createBottomTabNavigator({
    Home: { 
        screen: ViagemStackNavigator,
        navigationOptions: {
            title: 'Viagens',
            tabBarIcon: ({tintColor}) => 
                <Ionicons name='ios-car' size={30} color={tintColor} />
        }
    },
    Viagens: { 
        screen: RelatorioStack,
        navigationOptions: {
            title: 'Relatórios',
            tabBarIcon: ({tintColor}) => 
                <Ionicons name='ios-albums' size={30} color={tintColor} />
        }
    }
}, { })

export const BotaoDrawer = props => (
    <Ionicons 
        name='ios-options' size={30}
        style={{ marginRight:10 }}
        onPress={() => props.navigationProps.toggleDrawer()} />
)

export const BotaoVoltar = props => (
    <Icon 
        name='home' size={25}
        style={{ marginLeft: 20 }}
        onPress={() => props.navigationProps.navigate('Home')} />
)

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
    },
    CadastrarPessoa: {
        screen: CadastrarPessoa
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
    },
    CadastrarVeiculo: {
        screen: CadastrarVeiculo
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
        screen: HomeBottomTabNavigator,
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