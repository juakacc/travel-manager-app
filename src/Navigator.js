import React from 'react'

import Login from './screens/Login'
import PegarCarro from './screens/PegarCarro'
import Relatorio from './screens/Relatorio'
import ConcluirViagem from './screens/ConcluirViagem'
import Splash from './screens/LoginOuApp'
import CadastrarPessoa from './screens/CadastrarPessoa'
import CadastrarVeiculo from './screens/CadastrarVeiculo'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'

import { Text, View } from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableHighlight } from 'react-native-gesture-handler'
import Botao from './components/Botao'

const ViagemNav = createStackNavigator({
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

const AppNavigator = createBottomTabNavigator({
    Home: { 
        screen: ViagemNav,
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

const StackNavigator = createStackNavigator({
    App: {
        screen: AppNavigator
    }
}, {
    initialRouteName: 'App',
    defaultNavigationOptions: ({ navigation }) => ({
        headerTitle: () => <Text style={{fontSize: 24, marginLeft: 10}}><Icon name="road" size={30} color="#a50" /> Viagens PMO</Text>,
        headerRight: <NavigationDrawerStruture navigationProps={navigation} />
    })
})

const DrawerNavigator = createDrawerNavigator({
    Home: {
        title: 'Início',
        screen: StackNavigator
    },
    CadastrarPessoa: {
        screen: CadastrarPessoa
    },
    CadastrarVeiculo: {
        screen: CadastrarVeiculo
    }
    // cadastrar veiculo, cadastrar motorista...
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