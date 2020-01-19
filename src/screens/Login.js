import React, {Component} from 'react'

import {
    View, 
    Text,
    TextInput,
    Button,
    Alert
} from 'react-native'

export default class Login extends Component {
    render () {
        return (
            <View>
                <Text>Bem vindo ao sistema de gerenciamento de viagens da PMO</Text>
                <TextInput 
                    autoFocus={true}
                    placeholder='Login' />
                <TextInput 
                    placeholder='Senha'
                    secureTextEntry={true} />
                <Button
                title="Entrar"
                onPress={() => this.props.navigation.navigate('Home')}
                />
            </View>    
        )
    }
}