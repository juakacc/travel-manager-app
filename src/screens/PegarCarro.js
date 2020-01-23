import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import Header from '../components/Header'
import DisposicaoVeiculos from '../components/DisposicaoVeiculos'
import VeiculoAtual from '../components/VeiculoAtual'
import comumStyles from '../styles'
import FormSelectVeiculo from '../components/FormSelectVeiculo'

import functions from '../functions'

export default class PegarCarro extends React.Component {

    state = {
        temCarro: true,
        dataSaida: functions.getDateString()
    }

    entregarCarro = () => {
        this.props.navigation.navigate('ConcluirViagem')
        this.setState({temCarro: false})
    }

    pegarCarro = () => {
        this.setState({
            temCarro: true,
            dataSaida: functions.getDateString()
        })
    }

    render () {
        const veiculos = (this.state.temCarro) ? 
            <VeiculoAtual concluirViagem={() => this.entregarCarro()} dataSaida={this.state.dataSaida}/> : 
            <FormSelectVeiculo iniciarViagem={() => this.pegarCarro()} />

        return (
            <View style={styles.container}>
                <Header username='Suzélio' />

                <Text style={styles.textAlert}>NÃO ULTRAPASSE EM LUGAR INDEVIDO</Text>

                {veiculos}

                <DisposicaoVeiculos />

                <TouchableOpacity style={comumStyles.btn}
                    onPress={() => this.props.navigation.navigate('Viagens')} >
                    <Text style={comumStyles.btnText}>Pesquisar</Text>
                </TouchableOpacity>
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