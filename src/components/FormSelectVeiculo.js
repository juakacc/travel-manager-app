import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import VeiculosSelect from './VeiculosSelect'
import comumStyles from '../styles'

export default class FormSelectVeiculo extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Veículos disponíveis:</Text>
                <VeiculosSelect />
                <TouchableOpacity style={comumStyles.btn}
                    onPress={this.props.iniciarViagem} >
                    <Text style={comumStyles.btnText}>Pegar Veículo</Text>
                </TouchableOpacity>
                <Text style={styles.txtInfo}>Ao escolher um veículo será registrado o momento da saída</Text>
            </View>
        )
    }
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