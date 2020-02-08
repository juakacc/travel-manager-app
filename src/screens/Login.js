import React, {Component} from 'react'

import {
    View, 
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native'
import Botao from '../components/Botao'

import { login } from '../store/actions/user'
import { connect } from 'react-redux'

import Icon from 'react-native-vector-icons/FontAwesome'

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
            <View style={styles.container}>
                
                <Text style={styles.title}>
                    <Icon name="road" size={30} color="#a50" /> Viagens PMO
                </Text>
                <Text style={styles.subtitle}>Bem vindo ao sistema de gerenciamento de viagens da prefeitura municipal de Olivêdos</Text>

                <Text style={styles.subtitle}>Realize login para acessar as funcionalidades do aplicativo</Text>

                <TextInput
                    style={styles.field}
                    placeholder='Apelido'
                    value={this.state.apelido} 
                    returnKeyType='next'
                    onChangeText={apelido => this.setState({ apelido })} />
                <TextInput 
                    style={styles.field}
                    placeholder='Senha'
                    secureTextEntry={true} 
                    value={this.state.senha}
                    returnKeyType='done'
                    onChangeText={senha => this.setState({ senha })} />

                <TouchableOpacity onPress={() => {Alert.alert('Esqueci a senha')}}>
                    <Text style={styles.esqueci}>Esqueci a senha</Text>
                </TouchableOpacity>

                <Botao title='Entrar'
                    name='plug'
                    onPress={() => this.login()} />
            </View>    
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        marginBottom: 10
    },
    subtitle: {
        textAlign: 'center'
    },
    field: {
        width: 200,
        borderRadius: 20,
        backgroundColor: '#DCDCDC',
        paddingHorizontal: 10,
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