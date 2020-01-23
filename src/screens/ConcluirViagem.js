import React from 'react'
import {Text, View} from 'react-native'
import {Input} from 'react-native-elements'
import { StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native'

import comumStyles from '../styles' 
import { Alert } from 'react-native'

export default class ConcluirViagem extends React.Component {

    concluir = () => {
        Alert.alert('concluindo viagem...')
        this.props.navigation.navigate('Home')
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Complete os dados a seguir sobre a viagem</Text>
                <Input
                    keyboardType='numeric'
                    label='Quilometragem'
                    placeholder='KM atual'
                    errorStyle={{ color: 'red' }}
                    errorMessage='Teste de validação'
                    />
                
                <Input 
                    label='Comentário'
                    placeholder='Comentário sobre a viagem (opcional)'
                />

                <TouchableOpacity style={comumStyles.btn}
                    onPress={() => this.concluir()}>
                    <Text style={comumStyles.btnText}>Concluir Viagem</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    title: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 10
    }
})