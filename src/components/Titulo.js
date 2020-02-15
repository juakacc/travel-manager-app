import React from 'react'
import { Text, StyleSheet } from "react-native"

export default Titulo = props => {
    return (
        <Text style={styles.titulo}>{props.titulo}</Text>
    )
}

const styles = StyleSheet.create({
    titulo: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 3
    }
})