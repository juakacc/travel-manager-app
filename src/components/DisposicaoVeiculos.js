import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class DisposicaoVeiculos extends React.Component {

    state = {
        viagens: []
    }

    componentDidMount() {
        this.carregarViagens()
    }

    carregarViagens = () => {
        const options = {
            method: 'GET'
        }

        fetch('http://192.168.31.20:8080/viagens/nao-concluidas', options)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    viagens: res
                })
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Disposição atual dos veículos:</Text>

                {this.state.viagens.map(viagem => {
                    return (
                        <View key={viagem.id}>
                            <Text style={styles.motorista}>{viagem.motorista.apelido}</Text>
                            <Text style={styles.veiculo}>- {viagem.veiculo.nome} -</Text>
                        </View>
                    )
                })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    title: {
        color: '#000',
        fontFamily: 'shelter',
        fontWeight: 'bold',
        fontSize: 14
    },
    motorista: {
        fontSize: 14
    },
    veiculo: {
        color: '#777',
        fontSize: 11
    }
})