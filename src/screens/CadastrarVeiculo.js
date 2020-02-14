import React from 'react'
import { View, Text, StyleSheet, Picker, Alert } from 'react-native'
import { Input } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import Botao from '../components/Botao'

import axios from 'axios'
import { setMensagem } from '../store/actions/mensagem'
import { connect } from 'react-redux'

class CadastrarVeiculo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            nome: '',
            placa: '',
            renavam: '',
            marca: '',
            modelo: '',
            quilometragem: 0,
            cnh_requerida: 'A',

            err_nome: '',
            err_placa: '',
            err_renavam: '',
            err_marca: '',
            err_modelo: '',
            err_quilometragem: '',
            err_cnh_requerida: ''
        }
    }

    isValid = () => {
        const fields = {...this.state}

        let valid = true
        
        if (fields.nome == '') {
            this.setState({ err_nome: 'Digite um nome válido' })
            valid = false
        }

        if (fields.placa == '') {
            this.setState({ err_placa: 'Digite um nome válido' })
            valid = false
        }

        if (fields.renavam == '') {
            this.setState({ err_renavam: 'Digite um renavam válido' })
            valid = false
        }

        if (fields.marca == '') {
            this.setState({ err_marca: 'Digite uma marca válida' })
            valid = false
        }

        if (fields.modelo == '') {
            this.setState({ err_modelo: 'Digite um modelo válido' })
            valid = false
        }

        if (isNaN(fields.quilometragem) || fields.quilometragem < 0) {
            this.setState({ err_quilometragem: 'Digite uma quilometragem válida' })
            valid = false
        }

        if (fields.cnh_requerida == '') {
            this.setState({ err_cnh_requerida: 'Escolha uma CNH válida' })
            valid = false
        }
        return valid
    }

    
    salvarVeiculo = () => {

        if (true) {
            axios.post('veiculos', {
                nome: this.state.nome,
                placa: this.state.placa,
                renavam: this.state.renavam,
                marca: this.state.marca,
                modelo: this.state.modelo,
                quilometragem: this.state.quilometragem,
                cnh_requerida: this.state.cnh_requerida,
                disponivel: true
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                this.props.onShowMensagem(''+err.response.data[0].mensagemUsuario)
                console.log('Erro: ', err.response.data[0].mensagemUsuario)
            })
            // Alert.alert('Salvando veículo')
        }        
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Tela para cadastro de veículo</Text>

                <ScrollView>
                    <Input
                        label='Nome'
                        errorMessage={this.state.err_nome}
                        returnKeyType='next'
                        value={this.state.nome}
                        onChangeText={nome => this.setState({ nome })} />

                    <Input
                        label='Placa'
                        errorMessage={this.state.err_placa}
                        returnKeyType='next'
                        value={this.state.placa}
                        onChangeText={placa => this.setState({ placa })} />

                    <Input
                        label='Renavam'
                        errorMessage={this.state.err_renavam}
                        returnKeyType='next'
                        value={this.state.renavam}
                        onChangeText={renavam => this.setState({ renavam })} />

                    <Input
                        label='Marca'
                        errorMessage={this.state.err_marca}
                        returnKeyType='next'
                        value={this.state.marca}
                        onChangeText={marca => this.setState({ marca })} />

                    <Input
                        label='Modelo'
                        errorMessage={this.state.err_modelo}
                        returnKeyType='next'
                        value={this.state.modelo}
                        onChangeText={modelo => this.setState({ modelo })} />

                    <Input
                        keyboardType='numeric'
                        label='Quilometragem'
                        errorMessage={this.state.err_quilometragem}
                        returnKeyType='next'
                        value={`${this.state.quilometragem}`}
                        onChangeText={quilometragem => this.setState({ quilometragem })} />

                    <Text style={{ marginLeft: 10, fontWeight: 'bold', color: 'gray', fontSize: 15 }}>CNH Requerida</Text>

                    <Picker selectedValue={this.state.cnh_requerida}
                        onValueChange={(cnh_requerida) => 
                        this.setState({ cnh_requerida })}
                    >
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

                    <Botao onPress={() => this.salvarVeiculo()}
                        title='Salvar' name='save' />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    title: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 10
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onShowMensagem: msg => dispatch(setMensagem(msg))
    }
}

export default connect(null, mapDispatchToProps)(CadastrarVeiculo)