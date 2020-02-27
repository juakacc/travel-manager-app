import React from 'react'
import { Text, StyleSheet, TouchableOpacity, Alert } from "react-native"
import commonStyles from '../commonStyles'

export default class MotoristaItem extends React.Component {

    editar = () => {
        this.props.navigation.navigate('CadastrarPessoa', { 
            motoristaId: this.props.motorista.id
        })
    }

    render() {
        return (
            <TouchableOpacity style={styles.container}
                onPress={this.editar}>
                <Text>{ this.props.motorista.apelido }</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 5,
        backgroundColor: 'gray',
        borderRadius: 5
    }
})