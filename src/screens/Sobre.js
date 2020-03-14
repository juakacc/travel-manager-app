import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import config from '../config'
import commonStyles from '../commonStyles'
import GeneralStatusBarColor from '../components/GeneralStatusBarColor'

export default class Sobre extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <GeneralStatusBarColor backgroundColor="yellow" barStyle="dark-content"/>
                <View>
                    <Text style={styles.titulo}>
                        <Icon name="road" size={35} color={commonStyles.colors.secundaria} /> Viagens PMO
                    </Text>
                </View>

                <View style={styles.containerInfo}>
                    <Text style={styles.texto}>Dúvidas, sugestões e reclamações:</Text>
                    <Text style={styles.texto}>(83) 9 9184-7766</Text>
                    <Text style={styles.texto}>Entre em contato para que seja reparado</Text>
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
        backgroundColor: '#ffff33',
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
    }
})