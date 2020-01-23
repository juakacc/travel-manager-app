import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

export default class DisposicaoVeiculos extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Disposição atual dos veículos:</Text>

                <Text style={styles.motorista}>Deusinho</Text>
                <Text style={styles.veiculo}>- Ranger -</Text>
                
                <Text style={styles.motorista}>Romário</Text>
                <Text style={styles.veiculo}>- Spin -</Text>
                
                <Text style={styles.motorista}>Zezinho</Text>
                <Text style={styles.veiculo}>- Van -</Text>
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