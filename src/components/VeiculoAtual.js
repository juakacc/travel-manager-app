import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import comumStyles from '../styles'

export default props => {
    
    return (
            <View style={styles.container}>
                <Text style={styles.title}>Veículo que está com você: </Text>
                <Text style={styles.veiculo}>Gol 01</Text>
                <Text style={styles.saida}>Saída às {props.dataSaida}</Text>

                <TouchableOpacity style={comumStyles.btn}
                    onPress={props.concluirViagem} >
                    <Text style={comumStyles.btnText}>Entregar veículo</Text>
                </TouchableOpacity>
                <Text style={styles.txtInfo}>Ao entregar o veículo você deverá informar a quilometragem atual</Text>
            </View>
        )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#000',
        margin: 5,
        padding: 5
    },
    title: {
        fontWeight: 'bold'
    },
    veiculo: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'
    },
    saida: {
        textAlign: 'center',
        color: '#666'
    },
    txtInfo: {
        textAlign: 'center',
        color: '#f00'
    }
})