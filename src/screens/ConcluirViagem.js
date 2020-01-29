import React from 'react'
import {Text, View, StyleSheet, Alert} from 'react-native'
import {Input} from 'react-native-elements'

import Botao from '../components/Botao'
import functions from '../functions'
import moment from 'moment'

export default class ConcluirViagem extends React.Component {

    state = {
        viagem: null,
        descricao: '',
        quilometragem: 0
    }

    componentDidMount() {
        this.setState({ viagem: this.props.navigation.state.params.viagem })
    }

    concluir = () => {
        const dataAtual = moment().format('YYYY-MM-DD[T]HH:mm')

        fetch(functions.getAddress() + 'viagens/concluir/' + this.state.viagem.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "viagem": {
                    "saida": this.state.viagem.saida,
                    "chegada": dataAtual,
                    "descricao": this.state.descricao,
                    "veiculo": {
                        "id": this.state.viagem.veiculo.id
                    },
                    "motorista": {
                        "id": this.state.viagem.motorista.id
                    }
                },
                "quilometragem": this.state.quilometragem
            })
        })
        .then(res => res.text())
        .then(res => {
            console.log(res)
            Alert.alert('Viagem concluída com sucesso')
            // this.props.navigation.navigate('Home')
        })
        .catch(err => Alert.alert(err.message))
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
                    onChangeText={a => this.setState({ quilometragem: a })} />
                
                <Input 
                    label='Comentário'
                    placeholder='Comentário sobre a viagem (opcional)' 
                    onChangeText={a => this.setState({ descricao: a })}/>

                <Botao onPress={() => this.concluir()}
                    title='Concluir Viagem' />
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