import React from 'react'
import { View, Text, StyleSheet, Picker } from 'react-native'
import Titulo from '../components/Titulo'

import { salvar_usuario } from '../store/actions/user'
import { connect } from 'react-redux'

import commonStyles from '../commonStyles'
import { Input } from 'react-native-elements'
import Botao from '../components/Botao'
import { ScrollView } from 'react-native-gesture-handler'

const estadoInicial = {
    nome: '',
    apelido: '',
    cnh: '',
    categoria: '',
    telefone: '',
    senha: '',
    confirm_senha: '',

    err_nome: '',
    err_apelido: '',
    err_cnh: '',
    err_categoria: '',
    err_telefone: '',
    err_senha: '',
    err_confirm_senha: ''
}

class CadastrarPessoa extends React.Component {

    constructor(props) {
        super(props)
        this.state = estadoInicial
    }

    componentDidMount = () => {
        this.setState({ ...estadoInicial })
    }

    componentDidUpdate = prevProps => {
        if (prevProps.isLoading && !this.props.isLoading) {
            this.props.navigation.navigate('Home')
        }
    }

    isValid = () => {
        let valid = true
        this.setState({
            err_nome: '',
            err_apelido: '',
            err_cnh: '',
            err_categoria: '',
            err_telefone: '',
            err_senha: '',
            err_confirm_senha: ''
        })

        if (this.state.nome.trim() == '') {
            this.setState({ err_nome: 'Digite um nome válido' })
            valid = false
        }
        if (this.state.apelido.trim() == '') {
            this.setState({ err_apelido: 'Digite um apelido válido' })
            valid = false
        }
        if (this.state.cnh.trim() == '') {
            this.setState({ err_cnh: 'Digite uma CNH válida' })
            valid = false
        }
        if (this.state.categoria.trim() == '') {
            this.setState({ err_categoria: 'Escolha uma categoria válida' })
            valid = false
        }
        if (this.state.telefone.trim() == '') {
            this.setState({ err_telefone: 'Digite um telefone válido' })
            valid = false
        }
        if (this.state.senha.trim().length < 6) {
            this.setState({ 
                err_senha: 'A senha deve conter no mínimo 6 caracteres',
                senha: '',
                confirm_senha: ''
            })
            valid = false
        }
        if (this.state.confirm_senha != this.state.senha) {
            this.setState({ 
                err_confirm_senha: 'A senhas não correspondem',
                senha: '',
                confirm_senha: '' 
            })
            valid = false
        }
        return valid
    }

    salvar = () => {
        if (this.isValid()) {
            const usuario = {
                nome: this.state.nome,
                apelido: this.state.apelido.toLowerCase().trim(),
                cnh: this.state.cnh,
                categoria: this.state.categoria,
                telefone: this.state.telefone,
                senha: this.state.senha,
            }
            this.props.onSalvar(usuario)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Titulo titulo='Cadastro de Pessoa' />
        
                <ScrollView>
                    <Input
                        label='Nome'
                        errorMessage={this.state.err_nome}
                        returnKeyType='next'
                        value={this.state.nome}
                        onChangeText={nome => this.setState({ nome })} />

                    <Input
                        label='Apelido'
                        autoCapitalize='none'
                        errorMessage={this.state.err_apelido}
                        returnKeyType='next'
                        value={this.state.apelido}
                        onChangeText={apelido => this.setState({ apelido: apelido.toLowerCase().trim() })} />

                    <Input
                        label='CNH'
                        errorMessage={this.state.err_cnh}
                        returnKeyType='next'
                        value={this.state.cnh}
                        onChangeText={cnh => this.setState({ cnh })} />

                    <Text style={{ marginLeft: 10, fontWeight: 'bold', color: 'gray', fontSize: 15 }}>Categoria</Text>
                    <Picker selectedValue={this.state.categoria}
                        onValueChange={categoria => this.setState({ categoria })} >
                        <Picker.Item label='A' value='A' />
                        <Picker.Item label='B' value='B' />
                        <Picker.Item label='AB' value='AB' />
                        <Picker.Item label='C' value='C' />
                        <Picker.Item label='AC' value='AC' />
                        <Picker.Item label='D' value='D' />
                        <Picker.Item label='AD' value='AD' />
                        <Picker.Item label='E' value='E' />
                        <Picker.Item label='AE' value='AE' />
                    </Picker>

                    <Input
                        label='Telefone'
                        keyboardType='numeric'
                        errorMessage={this.state.err_telefone}
                        returnKeyType='next'
                        value={this.state.telefone}
                        onChangeText={telefone => this.setState({ telefone })} />

                    <Input
                        label='Senha'
                        errorMessage={this.state.err_senha}
                        returnKeyType='next'
                        secureTextEntry={true}
                        value={this.state.senha}
                        onChangeText={senha => this.setState({ senha })} />

                    <Input
                        label='Confirmar senha'
                        secureTextEntry={true}
                        errorMessage={this.state.err_confirm_senha}
                        returnKeyType='done'
                        value={`${this.state.confirm_senha}`}
                        onChangeText={confirm_senha => this.setState({ confirm_senha })} />

                    <Botao onPress={() => this.salvar()}
                        title='Salvar' name='save' />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        ...commonStyles.container
    }
})

const mapStateToProps = ({ user }) => {
    return {
        isLoading: user.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSalvar: user => dispatch(salvar_usuario(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CadastrarPessoa)