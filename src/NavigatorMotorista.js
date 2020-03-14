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

import { Text, View } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'

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
        headerStyle: {
            backgroundColor: 'yellow',
        },
        headerRight: <BotaoDrawer navigationProps={navigation} />
    })
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
        headerTitle: () => <Header />
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
        headerTitle: () => <Header />
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
        screen: Login
    },
    App: {
        screen: DrawerNavigator
    }
}, {
    initialRouteName: 'Splash'
})

export default createAppContainer(SwitchNavigator)