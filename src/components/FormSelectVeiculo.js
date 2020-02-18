import React from 'react'
import { View, Text, StyleSheet, Picker } from 'react-native'
import Botao from './Botao'

import { load_veiculos_disponiveis } from '../store/actions/veiculo'
import { connect } from 'react-redux'

class FormSelectVeiculo extends React.Component {

    state = {
        veiculoSelec: null
    }

    componentDidMount = () => {
        this.props.onAtualizarVeiculos()

        if (this.props.veiculos.length > 0) {
            this.setState({ veiculoSelec: this.props.veiculos[0].id })
        }
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

                { this.props.veiculos.length > 0 ?
                <View>
                    <Picker
                        selectedValue={this.state.veiculoSelec}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({ veiculoSelec: itemValue })
                        }}>
                        {this.props.veiculos.map(item => {
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

const mapStateToProps = ({ veiculo }) => {
    return {
        veiculos: veiculo.veiculos_disponiveis
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAtualizarVeiculos: () => dispatch(load_veiculos_disponiveis())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormSelectVeiculo)

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