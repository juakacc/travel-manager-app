import React from 'react'
import { View, StyleSheet, Text, Linking, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import config from '../conf'
import commonStyles from '../commonStyles'

export default class Sobre extends React.Component {

    enviarMsg = () => {
        const msg = `Dúvidas, sugestões e reclamações: `
        Linking.openURL(`whatsapp://send?phone=${config.phone}&text=${msg}`)
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.titulo}>
                        <Icon name="road" size={35} color={commonStyles.colors.secundaria} /> Viagens PMO
                    </Text>
                </View>

                <View style={styles.containerInfo}>
                    <TouchableOpacity onPress={this.enviarMsg}>
                        <Text style={[styles.texto, styles.button]}>Dúvidas, sugestões e reclamações?</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.containerInfo}>
                    <Text style={styles.texto}><Icon name='registered' /> 2020 Geral.Info Soft</Text>
                    <Text style={styles.texto}>Versão: {config.version}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: commonStyles.colors.principalClaro,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    titulo: {
        fontSize: 30, 
        fontWeight: 'bold'
    },
    containerInfo: {
        alignItems: 'center',
        color: commonStyles.colors.secundaria
    },
    texto: {
        color: commonStyles.colors.secundaria,
        fontSize: 16,
        fontWeight: 'bold'
    },
    button: {
        fontSize: 20
    }
})