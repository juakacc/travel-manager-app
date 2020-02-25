import React, {Component} from 'react'

import {
    View, 
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform
} from 'react-native'
import Botao from '../components/Botao'

import { login } from '../store/actions/user'
import { connect } from 'react-redux'

import PasswordInputText from 'react-native-hide-show-password-input'
import { Input } from 'react-native-elements'

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
            // <View style={styles.container}>

                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.select({
                        ios: 'padding',
                        android: null,
                    })} >

                    {/* <View style={styles.containerTitles}> */}
                        {/* <Text style={styles.subtitle}>Bem vindo ao sistema de gerenciamento de viagens da prefeitura municipal de Olivêdos</Text>
                        <Text style={styles.subtitle}>Realize login para acessar as funcionalidades do aplicativo:</Text> */}
                    {/* </View> */}

                    {/* <View style={styles.containerForm}> */}
                
                        <View style={styles.field}>
                            <Input
                                style={styles.field}
                                autoCapitalize='none'
                                label='Apelido'
                                value={this.state.apelido} 
                                returnKeyType='next'
                                onChangeText={apelido => this.setState({ apelido: apelido.toLowerCase() })} />
                        </View>

                        <View style={styles.field}>
                            <PasswordInputText
                                style={{fontSize: 19, marginHorizontal: 10}}
                                autoCapitalize='none'
                                label='Senha'
                                value={this.state.senha}
                                returnKeyType='done'
                                onChangeText={senha => this.setState({ senha })} />
                        </View>

                        <TouchableOpacity onPress={() => {Alert.alert('(83) 9 9184-7766 - Entre em contato e solicite uma nova senha')}}>
                            <Text style={styles.esqueci}>Esqueci a senha</Text>
                        </TouchableOpacity>

                        <Botao title='Entrar' name='sign-in-alt' onPress={() => this.login()} />
                    {/* </View> */}
                </KeyboardAvoidingView>                
            // {/* </View>     */}
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerTitles: {
        flex: 1
    },
    containerForm: {
        flex: 2,
        justifyContent: 'center',
        // paddingTop: 100
    },
    title: {
        fontSize: 30,
        marginBottom: 10
    },
    subtitle: {
        textAlign: 'center',
        marginTop: 10
    },
    field: {
        width: 300,
        marginTop: 10
    },
    esqueci: {
        color: 'blue',
        marginVertical: 10
    }
})

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