import React from 'react'
import { View, Text, StyleSheet, Picker, Alert } from 'react-native'
import { Input } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import Botao from '../components/Botao'

class CadastrarVeiculo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            nome: '',
            placa: '',
            renavam: '',
            marca: '',
            modelo: '',
            quilometragem: 0,
            cnh_requerida: 'A'
        }
    }
    
    salvarVeiculo = () => {
        Alert.alert('Salvando veículo')
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Tela para cadastro de veículo</Text>

                <ScrollView>
                    <Input
                        label='Nome'
                        // errorMessage={this.state.errQuilometragem}
                        returnKeyType='next'
                        value={this.state.nome}
                        onChangeText={nome => this.setState({ nome })} />

                    <Input
                        label='Placa'
                        // errorMessage={this.state.errQuilometragem}
                        returnKeyType='next'
                        value={this.state.placa}
                        onChangeText={placa => this.setState({ placa })} />

                    <Input
                        label='Renavam'
                        // errorMessage={this.state.errQuilometragem}
                        returnKeyType='next'
                        value={this.state.renavam}
                        onChangeText={renavam => this.setState({ renavam })} />

                    <Input
                        label='Marca'
                        // errorMessage={this.state.errQuilometragem}
                        returnKeyType='next'
                        value={this.state.marca}
                        onChangeText={marca => this.setState({ marca })} />

                    <Input
                        label='Modelo'
                        // errorMessage={this.state.errQuilometragem}
                        returnKeyType='next'
                        value={this.state.modelo}
                        onChangeText={modelo => this.setState({ modelo })} />

                    <Input
                        keyboardType='numeric'
                        label='Quilometragem'
                        // errorMessage={this.state.errQuilometragem}
                        returnKeyType='next'
                        value={`${this.state.quilometragem}`}
                        onChangeText={quilometragem => this.setState({ quilometragem })} />

                    <Text style={{ marginLeft: 10, fontWeight: 'bold', color: 'gray', fontSize: 15 }}>CNH Requerida</Text>

                    <Picker selectedValue={this.state.cnh_requerida}
                        onValueChange={(cnh_requerida) => 
                        this.setState({ cnh_requerida })}
                    >
                        <Picker.Item label='A' value='A' />
                        <Picker.Item label='B' value='B' />
                        <Picker.Item label='AB' value='AB' />
                        <Picker.Item label='C' value='C' />
                        <Picker.Item label='AC' value='AC' />
                        <Picker.Item label='D' value='D' />
                        <Picker.Item label='AD' value='AD' />
                        <Picker.Item label='E' value='E' />
                        <Picker.Item label='AE' value='AE' />
                    </Picker>

                    <Botao onPress={() => this.salvarVeiculo()}
                        title='Salvar' name='save' />
                </ScrollView>
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

export default CadastrarVeiculo