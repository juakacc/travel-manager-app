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

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'

import { Text, View } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import DetalharViagem from './screens/DetalharViagem'
import Sobre from './screens/Sobre'
import ListPessoas from './screens/ListPessoas'

// Header to StackNavigator
const Header = () => {
    return (
        <View>
            <Text style={{ fontSize: 24 }}><Icon name="road" size={30} color="#a50" /> Viagens PMO</Text>
        </View>
    )
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
    // headerMode: "none"
    headerLayoutPreset: 'center',
    defaultNavigationOptions: ({ navigation }) => ({
        headerTitle: () => <Header />,
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
        headerTitle: () => <Header />,
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
})

class BotaoDrawer extends React.Component {

    onPressE = () => {
        this.props.navigationProps.toggleDrawer()
    }

    render() {
        return (
            <Ionicons 
                name='ios-options' size={30}
                style={{ marginRight:10 }}
                onPress={this.onPressE} />
        )
    }
}

class BotaoVoltar extends React.Component {

    onPressE = () => {
        this.props.navigationProps.navigate('Home')
    }

    render() {
        return (
            <Icon 
                name='home' size={25}
                style={{ marginLeft: 20 }}
                onPress={this.onPressE} />
        )
    }
}

const HomeStackNavigator = createStackNavigator({
    App: {
        screen: HomeBottomTabNavigator
    }
}, {
    headerMode: 'none'
    // headerLayoutPreset: 'center',
    // defaultNavigationOptions: ({ navigation }) => ({
    //     headerTitle: () => <Header />,
    //     headerRight: <BotaoDrawer navigationProps={navigation} />
    // })
})

const LogoutStackNavigator = createStackNavigator({
    Logout: {
        screen: Logout
    }
}, {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: ({ navigation }) => ({
        headerTitle: () => <Header />,
        headerLeft: <BotaoVoltar navigationProps={navigation} />
    })
})

const PessoasStack = createStackNavigator({
    ListPessoas: {
        screen: ListPessoas,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <BotaoVoltar navigationProps={navigation} />
        })
    },
    CadastrarPessoa: {
        screen: CadastrarPessoa
    }
}, {
    initialRouteName: 'ListPessoas',
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
        headerTitle: () => <Header />
    }
})

const CadastrarVeiculoStack = createStackNavigator({
    Screen: {
        screen: CadastrarVeiculo
    }
}, {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: ({ navigation }) => ({
        headerTitle: () => <Header />,
        headerLeft: <BotaoVoltar navigationProps={navigation} />
    })
})

const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeBottomTabNavigator,
        navigationOptions: {
            drawerLabel: 'Tela Inicial',
            drawerIcon: ({ tintColor }) => (<Ionicons name='ios-home' size={25} color={tintColor} />)
        }
    },
    CadastrarPessoa: {
        screen: PessoasStack,
        navigationOptions: {
            drawerLabel: 'Pessoas',
            drawerIcon: ({ tintColor }) => (<Ionicons name='ios-person-add' size={25} color={tintColor} />)
        }
    },
    CadastrarVeiculo: {
        screen: CadastrarVeiculoStack,
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

const LoginStack = createStackNavigator({
    Screen: {
        screen: Login
    }
}, {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
        headerTitle: () => <Header />
    }
})

const SwitchNavigator = createSwitchNavigator({
    Splash: {
        screen: Splash
    },
    Auth: {
        screen: LoginStack
    },
    App: {
        screen: DrawerNavigator
    }
}, {
    initialRouteName: 'Splash'
})

export default createAppContainer(SwitchNavigator)