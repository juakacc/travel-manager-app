import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Botao from './Botao'

export default props => {
    
    return (
            <View style={styles.container}>
                <Text style={styles.title}>Veículo que está com você: </Text>
                <Text style={styles.veiculo}>{props.viagem.veiculo.nome}</Text>
                <Text style={styles.saida}>Saída às {props.viagem.saida}</Text>

                <Botao onPress={props.concluirViagem}
                    title='Entregar veículo'/>
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