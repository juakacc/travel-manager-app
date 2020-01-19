import React from 'react'
import { createAppContainer,
        createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Login from './screens/Login'
import PegarCarro from './screens/PegarCarro'
import Relatorio from './screens/Relatorio'

const MenuRoutes = {
    Home: {
        name: 'Home',
        screen: PegarCarro,
        navigationOptions: {
            title: 'Tela inicial'
        }
    },
    Auth: {
        name: 'Auth',
        screen: Login,
        navigationOptions: {title: 'Login'}
    },
    Viagens: {
        name: 'Viagens',
        screen: Relatorio,
        navigationOptions: {title: 'Viagens'}
    }
}

const MenuConfig = {
    initialRouteName: 'Home'
}

const MenuNavigator = createStackNavigator(MenuRoutes, MenuConfig)


export default MenuNavigator