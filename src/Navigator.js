import React from 'react'

import Login from './screens/Login'
import PegarCarro from './screens/PegarCarro'
import Relatorio from './screens/Relatorio'
import ConcluirViagem from './screens/ConcluirViagem'
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
        screen: PegarCarro
    },
    ConcluirViagem: {
        screen: ConcluirViagem
    }
}, {
    initialRouteName: 'Viagem',
    headerMode: "none"
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
        screen: Relatorio,
        navigationOptions: {
            title: 'Relatorio',
            tabBarIcon: ({tintColor}) => 
                <Ionicons name='ios-albums' size={30} color={tintColor} />
        }
    }
})


// Add button options in header
class NavigationDrawerStruture extends React.Component {

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
            <Ionicons 
                name='ios-arrow-back' size={30}
                style={{ marginLeft:15 }}
                onPress={this.onPressE} />
        )
    }
}

const HomeStackNavigator = createStackNavigator({
    App: {
        screen: HomeBottomTabNavigator
    }
}, {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: ({ navigation }) => ({
        headerTitle: () => <Header />,
        headerRight: <NavigationDrawerStruture navigationProps={navigation} />
    })
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

const CadastrarPessoaStack = createStackNavigator({
    Screen: {
        screen: CadastrarPessoa
    }
}, {
    headerLayoutPreset: 'center',
    defaultNavigationOptions: ({ navigation }) => ({
        headerTitle: () => <Header />,
        headerLeft: <BotaoVoltar navigationProps={navigation} />
    })
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
        screen: HomeStackNavigator,
        navigationOptions: {
            drawerLabel: 'Tela Inicial',
            drawerIcon: ({ tintColor }) => (<Ionicons name='ios-home' size={25} color={tintColor} />)
        }
    },
    CadastrarPessoa: {
        screen: CadastrarPessoaStack,
        navigationOptions: {
            drawerLabel: 'Cadastrar Pessoa',
            drawerIcon: ({ tintColor }) => (<Ionicons name='ios-person-add' size={25} color={tintColor} />)
        }
    },
    CadastrarVeiculo: {
        screen: CadastrarVeiculoStack,
        navigationOptions: {
            drawerLabel: 'Cadastrar Veículo',
            drawerIcon: ({ tintColor }) => (<Ionicons name='ios-car' size={25} color={tintColor} />)
        }
    },
    Logout: {
        screen: LogoutStackNavigator,
        navigationOptions: {
            drawerLabel: 'Sair do App',
            drawerIcon: () => (<Ionicons name='ios-power' size={25} color='red' />)
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
})

export default createAppContainer(SwitchNavigator)