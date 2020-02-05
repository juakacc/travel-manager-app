import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Login from './screens/Login'
import PegarCarro from './screens/PegarCarro'
import Relatorio from './screens/Relatorio'
import ConcluirViagem from './screens/ConcluirViagem'

const MenuRoutes = {
    Home: {
        name: 'Home',
        screen: PegarCarro,
        navigationOptions: {
            title: 'Tela inicial'
        }
    },
    ConcluirViagem: {
        name: 'ConcluirViagem',
        screen: ConcluirViagem,
        navigationOptions: {
            title: 'Conclusão de viagem'
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
    initialRouteName: 'Auth'
}

const MenuNavigator = createStackNavigator(MenuRoutes, MenuConfig)


export default createAppContainer(MenuNavigator)