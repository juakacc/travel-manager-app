import React from 'react'
import { View, Text, StyleSheet, Picker } from 'react-native'
import Botao from './Botao'
import functions from '../functions'

import axios from 'axios'
import { connect } from 'react-redux'
import { iniciarViagem } from '../store/actions/viagem'
import moment from 'moment'

class FormSelectVeiculo extends React.Component {

    state = {
        veiculos: [],
        veiculoSelec: null
    }

    componentDidMount() {
        this.getVeiculos()
    }

    enviarVeiculo = () => {
        const dataAtual = moment().format('YYYY-MM-DD[T]HH:mm')
        
        const viagem = {
            "saida": dataAtual,
            "veiculo": {
                "id": this.state.veiculoSelec
            },
            "motorista": {
                "id": this.props.motorista.id
            }
        }
        this.props.onIniciarViagem(viagem)
    }

    getVeiculos = async () => {
        await axios.get('veiculos/disponiveis')
                .then(res => {
                    if (res.data.length > 0) {
                        this.setState({
                            veiculos: res.data,
                            veiculoSelec: res.data[0].id
                        })
                    }
                })
                .catch(er => console.log('GET_VEICULOS', er.message))        
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Veículos disponíveis:</Text>

                {this.state.veiculos.length > 0 ?
                <View>
                    <Picker
                        selectedValue={this.state.veiculoSelec}
                        onValueChange={(itemValue, itemIndex) => {
                            this.setState({veiculoSelec: itemValue})
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

const mapStateToProps = ({user}) => {
    return {
        motorista: user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIniciarViagem: viagem => dispatch(iniciarViagem(viagem))
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