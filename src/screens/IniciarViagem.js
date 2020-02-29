import React from 'react'
import { connect } from 'react-redux'
import { iniciarViagem } from '../store/actions/viagem'
import { setMensagem } from '../store/actions/mensagem'
import { View, StyleSheet, Text } from 'react-native'
import { Input } from 'react-native-elements'

import moment from 'moment'
import Botao from '../components/Botao'
import commonStyles from '../commonStyles'
import Titulo from '../components/Titulo'

import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay'

class IniciarViagem extends React.Component {

    state = {
        quilometragem: 0,
        errQuilometragem: '',
        veiculoId: 0,
        veiculoNome: ''
    }

    componentDidUpdate = prevProps => {
        if (prevProps.isLoading && !this.props.isLoading) {
            this.props.navigation.navigate('Viagem')
        }
    }

    isValid = () => {
        this.setState({
            errQuilometragem: ''
        })

        if(isNaN(this.state.quilometragem) || this.state.quilometragem <= 0) {
            this.setState({ 
                errQuilometragem: 'Insira uma quilometragem válida!',
                quilometragem: 0
            })
            return false
        }
        return true
    }

    componentDidMount = () => {
        const veiculoId = this.props.navigation.getParam('idVeiculo')

        if (!veiculoId) {
            this.props.setMensagem('Veículo inválido')
            this.props.navigation.navigate('Viagem')
        } else {
            this.setState({ veiculoId }, this.carregarVeiculo)
        }
    }

    carregarVeiculo = () => {
        axios.get(`veiculos/${this.state.veiculoId}`)
        .then(res => {
            this.setState({ 
                veiculoNome: res.data.nome,
                quilometragem: res.data.quilometragem
            })
        })
        .catch(err => {
            this.props.setMensagem('Veículo inválido')
            this.props.navigation.navigate('Viagem')
        })
    }

    iniciarViagem = () => {

        if (this.isValid()) {
            const dataAtual = moment().format('YYYY-MM-DD[T]HH:mm')
        
            const viagem = {
                "saida": dataAtual,
                "km_inicial": this.state.quilometragem,
                "veiculo": this.state.veiculoId,
                "motorista": this.props.motorista.id
            }
            this.props.onIniciarViagem(viagem)
        }        
    }

    render() {
        return (
            <View style={styles.container}>
                <Spinner visible={this.props.isSubmetendo} />
                
                <Titulo titulo='Iniciar Viagem' />

                <Text style={styles.veiculo}>{ this.state.veiculoNome }</Text>

                <Text style={styles.title}>Qual a quilometragem atual registrada no veículo?</Text>
                <Input
                    keyboardType='numeric'
                    label='Quilometragem'
                    placeholder='KM atual do veículo'
                    value={`${this.state.quilometragem}`}
                    errorMessage={this.state.errQuilometragem}
                    returnKeyType='next'
                    onChangeText={quilometragem => this.setState({ quilometragem })} />

                <Botao onPress={this.iniciarViagem}
                    isSubmetendo={this.props.isSubmetendo} 
                    title='Iniciar viagem' 
                    name='route' />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        ...commonStyles.container
    },
    title: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 10
    },
    veiculo: {
        color: 'red',
        textAlign: 'center',
        fontSize: 20,
        marginVertical: 10
    }
})

const mapStateToProps = ({ user, viagem }) => {
    return {
        motorista: user,
        isLoading: viagem.isLoading,
        isSubmetendo: viagem.isSubmetendo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIniciarViagem: viagem => dispatch(iniciarViagem(viagem)),
        setMensagem: msg => dispatch(setMensagem(msg))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IniciarViagem)