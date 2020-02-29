import React from 'react'
import { View, Text, StyleSheet, Picker } from 'react-native'
import Botao from './Botao'

import axios from 'axios'

class FormSelectVeiculo extends React.Component {
    // _isMounted = false

    state = {
        veiculos: [],
        veiculoSelec: null
    }

    componentDidMount() {
        // this._isMounted = true

        this.focusListener = this.props.navigation.addListener('didFocus', () => {

            this.props.componenteOk(false)
            axios.get('veiculos/disponiveis')
            .then(res => {
                // if(this._isMounted) {
                    this.setState({ veiculos: res.data })
                
                    if (res.data.length > 0) {
                        this.setState({ veiculoSelec: res.data[0].id })
                    }
                // }
                this.props.componenteOk(true)
            })
            .catch(err => {
                console.log(err || '')
                this.props.componenteOk(true)
            })
        });
    }

    componentWillUnmount() {
        this.focusListener.remove()
        // this._isMounted = false
    }

    enviarVeiculo = () => {
        this.props.navigation.navigate('IniciarViagem', {
            idVeiculo: this.state.veiculoSelec
        })        
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Veículos disponíveis:</Text>

                { this.state.veiculos.length > 0 ?
                <View>
                    <Picker
                        selectedValue={this.state.veiculoSelec}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({ veiculoSelec: itemValue })
                        }}>
                        {this.state.veiculos.map(item => {
                            return (<Picker.Item label={item.nome} value={item.id} key={item.id}/>) 
                        })}
                    </Picker>

                    <Botao onPress={this.enviarVeiculo} title='Pegar Veículo' name='key' />
                    <Text style={styles.txtInfo}>Ao escolher um veículo será registrado o momento da saída</Text>
                </View> : 
                    <Text style={styles.txtSemVeiculo}>Nenhum veículo disponível no momento. Aguarde até que um esteja disponível</Text>
                }
            </View>
        )
    }
}

export default FormSelectVeiculo

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
    },
    txtSemVeiculo: {
        margin: 10,
        textAlign: 'center'
    }
})