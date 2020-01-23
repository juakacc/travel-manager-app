import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


export default props => {
    return (
        <View>
            <Text style={styles.title}>Últimas viagens finalizadas:</Text>

            <Text>Gol 01 - Romário - 90 KM</Text>
            <Text>Gol 01 - Romário - 90 KM</Text>
            <Text>Gol 01 - Romário - 90 KM</Text>
            <Text>Gol 01 - Romário - 90 KM</Text>
            <Text>Gol 01 - Romário - 90 KM</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 15
    }
})