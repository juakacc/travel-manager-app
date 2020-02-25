import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

export default class Sobre extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.titulo}>
                        <Icon name="road" size={35} color="#a50" /> Viagens PMO
                    </Text>
                </View>

                <Text>Versão 1.0.0</Text>

                <Text style={styles.contato}>Dúvidas, sugestões e reclamações: (83) 9 9184-7766. Entre em contato para que seja reparado</Text>

                <Text style={styles.registro}><FontAwesome5Icon name='registered' /> 2020 Geral.Info Soft</Text>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff33',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titulo: {
        fontSize: 30, 
        fontWeight: 'bold'
    },
    registro: {
        marginTop: 20
    },
    contato: {
        textAlign: 'center'
    }
})