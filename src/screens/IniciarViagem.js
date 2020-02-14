import React from 'react'
import { connect } from 'react-redux'
import { iniciarViagem } from '../store/actions/viagem'
import { View } from 'react-native'
import { Input } from 'react-native-elements'

import moment from 'moment'
import Botao from '../components/Botao'

class IniciarViagem extends React.Component {

    state = {
        quilometragem: 0,
        errQuilometragem: ''
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

    iniciarViagem = () => {

        if (this.isValid()) {
            const dataAtual = moment().format('YYYY-MM-DD[T]HH:mm')
        
            const viagem = {
                "saida": dataAtual,
                "km_inicial": this.state.quilometragem,
                "veiculo": {
                    "id": this.props.navigation.getParam('idVeiculo')
                },
                "motorista": {
                    "id": this.props.motorista.id
                }
            }
            this.props.onIniciarViagem(viagem)
        }        
    }

    render() {
        return (
            <View>
                <Input
                    keyboardType='numeric'
                    label='Quilometragem'
                    placeholder='KM atual'
                    errorMessage={this.state.errQuilometragem}
                    returnKeyType='next'
                    onChangeText={quilometragem => this.setState({ quilometragem })} />

                <Botao onPress={this.iniciarViagem} title='Iniciar viagem' name='key' />
            </View>
        )
    }
}

const mapStateToProps = ({ user, viagem }) => {
    return {
        motorista: user,
        isLoading: viagem.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIniciarViagem: viagem => dispatch(iniciarViagem(viagem))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IniciarViagem)