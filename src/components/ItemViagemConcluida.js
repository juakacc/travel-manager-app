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
                <View style={styles.viewVeiculo}>
                    <Text style={styles.veiculo}>[{this.props.viagem.veiculo.nome}]</Text>
                </View>
                <View style={styles.viewMotorista}>
                    <Text style={styles.motorista}>{this.props.viagem.motorista.apelido}</Text>
                </View>
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    viewVeiculo: {
        flex: 1,
        alignItems: 'center'
    },
    viewMotorista: {
        flex: 1,
        alignItems: 'center'
    },
    motorista: {
        fontWeight: 'bold'
    }
})

export default ItemViagemConcluida