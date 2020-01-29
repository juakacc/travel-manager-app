import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Header from '../components/Header'
import DisposicaoVeiculos from '../components/DisposicaoVeiculos'
import VeiculoAtual from '../components/VeiculoAtual'
import FormSelectVeiculo from '../components/FormSelectVeiculo'

import functions from '../functions'
import moment from 'moment'
import Botao from '../components/Botao'

export default class PegarCarro extends React.Component {
    _isMounted = false

    state = {
        motorista: {
            id: null,
            nome: '',
            apelido: ''
        },
        viagem: null,
        dataSaida: functions.getDateString()
    }

    componentDidMount() {
        this._isMounted = true

        fetch(functions.getAddress() + 'motoristas/' + 2, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => {
            if (this._isMounted) {
                this.setState({ motorista: res })
                this.getViagem()
            }
        })
        .catch(err => console.log('caiu no getMotorista: ' + err.message))
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    entregarCarro = () => {
        this.props.navigation.navigate('ConcluirViagem', { viagem: this.state.viagem })
    }

    pegarVeiculo = veiculoId => {
        this.setState({
            dataSaida: functions.getDateString()
        })

        const dataAtual = moment().format('YYYY-MM-DD[T]HH:mm')

        fetch(functions.getAddress() + 'viagens', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "saida": dataAtual,
                "veiculo": {
                    "id": veiculoId
                },
                "motorista": {
                    "id": this.state.motorista.id
                }
            })
        })
        .then(res => res.json())
        .then(res => {
            this.setState({ viagem: res })
        })
        .catch(error => console.log(error.message))
    }

    getViagem = () => {
        fetch(functions.getAddress() + 'viagens/nao-concluidas/' + this.state.motorista.id, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => {
            this.setState({ viagem: res })
        })
        .catch(err => {
            console.log(err.message)
            this.setState({ viagem: null })
        })
    }

    render () {
        const veiculos = (this.state.viagem != null) ? 
            <VeiculoAtual concluirViagem={() => this.entregarCarro()} viagem={this.state.viagem}/> : 
            <FormSelectVeiculo iniciarViagem={veiculoId => this.pegarVeiculo(veiculoId)} />

        return (
            <View style={styles.container}>
                <Header username={this.state.motorista.nome} />

                <Text style={styles.textAlert}>NÃO ULTRAPASSE EM LUGAR INDEVIDO</Text>

                {veiculos}

                <DisposicaoVeiculos />

                <Botao onPress={() => this.props.navigation.navigate('Viagens')}
                    title='Pesquisar'/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    textAlert: {
        color: '#fff',
        backgroundColor: '#f00',
        padding: 5,
        margin: 2,
        borderRadius: 5,
        textAlign: 'center',
        fontWeight: "bold"
    }
})