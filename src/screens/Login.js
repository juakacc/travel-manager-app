import React, {Component} from 'react'

import {
    View, 
    Text,
    TextInput
} from 'react-native'
import Botao from '../components/Botao'

import { login } from '../store/actions/user'
import { connect } from 'react-redux'


class Login extends Component {

    state = {
        apelido: '',
        senha: ''
    }

    login = () => {
        this.props.onLogin({...this.state})
    }

    componentDidUpdate = prevProps => {
        if (prevProps.isLoading && !this.props.isLoading) {
            this.props.navigation.navigate('Home')
        }
    }

    render () {
        return (
            <View>
                <Text>Bem vindo ao sistema de gerenciamento de viagens da PMO</Text>
                <TextInput 
                    autoFocus={true}
                    placeholder='Apelido'
                    value={this.state.apelido} 
                    onChangeText={apelido => this.setState({ apelido })} />
                <TextInput 
                    placeholder='Senha'
                    secureTextEntry={true} 
                    value={this.state.senha}
                    onChangeText={senha => this.setState({ senha })} />

                <Botao title='Entrar'
                    onPress={() => this.login()} />
            </View>    
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch(login(user))
    }
}

const mapStateToProps = ({ user }) => {
    return {
        isLoading: user.isLoading
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)