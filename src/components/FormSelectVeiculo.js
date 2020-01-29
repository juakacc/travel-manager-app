import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Picker } from 'react-native'
import Botao from './Botao'
import functions from '../functions'

export default class FormSelectVeiculo extends React.Component {

    state = {
        veiculos: [],
        selecionado: null
    }

    componentDidMount() {
        this.getVeiculos()
    }

    enviarVeiculo = () => {
        console.log('form: ' + this.state.selecionado)
        this.props.iniciarViagem(this.state.selecionado)
    }

    getVeiculos = () => {
        fetch(functions.getAddress() + 'veiculos/disponiveis', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => {
            if (res.length > 0) {
                this.setState({
                    veiculos: res,
                    selecionado: res[0].id
                })
            }
        })
        .catch(er => console.log(er.message))
    }

    onChange = veiculoSelected => {
        this.setState({selecionado: veiculoSelected})
        this.props.onChange(veiculoSelected)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Veículos disponíveis:</Text>
                
                <Picker
                    selectedValue={this.state.selecionado}
                    onValueChange={(itemValue, itemIndex) => {
                        this.onChange(itemValue)
                    }}>
                    {this.state.veiculos.map(item => {
                        return (<Picker.Item label={item.nome} value={item.id} key={item.id}/>) 
                    })}
                </Picker>

                <Botao onPress={this.enviarVeiculo}
                    title='Pegar Veículo' />
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