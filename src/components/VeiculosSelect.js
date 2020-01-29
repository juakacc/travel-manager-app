import React from 'react'
import {Picker, View, Text, StyleSheet} from 'react-native'
import functions from '../functions'


export default class VeiculoSelect extends React.Component {

    state = {
        veiculos: [],
        selecionado: null
    }

    componentDidMount() {
        this.getVeiculos()
    }

    getVeiculos = () => {
        const options = {
            method: 'GET'
        }
        fetch(functions.getAddress() + 'veiculos/disponiveis', options)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    veiculos: res,
                    selecionado: res[0].id
                })
            })
            .catch(er => console.log(er.message))
    }

    onChange = itemValue => {
        this.setState({selecionado: itemValue})
        this.props.onChange(itemValue)
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Veículo:</Text>
                <Picker
                    selectedValue={this.state.selecionado}
                    onValueChange={(itemValue, itemIndex) => {
                        this.onChange(itemValue)
                    }}>
                    {this.state.veiculos.map(item => {
                        return (<Picker.Item label={item.nome} value={item.id} key={item.id}/>) 
                    })}
                </Picker>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // flexDirection: 'row'
    }
})