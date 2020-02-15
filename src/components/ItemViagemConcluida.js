import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'

class ItemViagemConcluida extends React.Component {

    detalharViagem = () => {
        this.props.navigation.navigate('ViagemDetalhes', {
            idViagem: this.props.viagem.id
        })
    }

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.detalharViagem}>
                <Text style={styles.veiculo}>[{this.props.viagem.veiculo.nome}]</Text>
                <Text style={styles.motorista}>{this.props.viagem.motorista.nome}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 3,
        backgroundColor: '#ccc',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    veiculo: {

    },
    motorista: {
        fontWeight: 'bold'
    }
})

export default ItemViagemConcluida