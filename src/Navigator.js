import React from 'react'

import Login from './screens/Login'
import PegarCarro from './screens/PegarCarro'
import Relatorio from './screens/Relatorio'
import ConcluirViagem from './screens/ConcluirViagem'
import Splash from './screens/LoginOuApp'

import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Button, Alert } from 'react-native'
import { Icon } from 'react-native-vector-icons/FontAwesome'

const ViagemNav = createStackNavigator({
    Viagem: {
        screen: PegarCarro
    },
    ConcluirViagem: {
        screen: ConcluirViagem
    }
}, {
    initialRouteName: 'Viagem',
    defaultNavigationOptions: {
        // headerTitle: () => <Icon name="road" size={30} color="#a50" />
        headerRight: () => (
            <Button
                onPress={() => Alert.alert('This is a button!')}
                title="Sair"
                color="red"
            />
        )
    }
})

const AppNavigator = createBottomTabNavigator({
    Home: { 
        screen: ViagemNav,
        navigationOptions: {
            title: 'Teste'
        }
    },
    Viagens: { 
        screen: Relatorio 
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
        screen: AppNavigator
    }
})

export default createAppContainer(SwitchNavigator)