import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import axios from 'axios'
import { connect } from 'react-redux'
import { setMensagem } from '../store/actions/mensagem'
import commonStyles from '../commonStyles'
import functions from '../functions'
import Titulo from '../components/Titulo'

class DetalharViagem extends React.Component {

    state = {
        viagem: {
            id: 0,
            chegada: '', 
            descricao: '', 
            km_final: 0, 
            km_inicial: 0, 
            motorista: {
                nome: '', 
            }, 
            saida: '', 
            veiculo: {
                nome: ''
            }
        }
    }

    componentDidMount = async () => {
        const idViagem = this.props.navigation.getParam('idViagem')
        
        if (idViagem) {
            await axios.get(`viagens/${idViagem}`, {
                headers: {
                    Authorization: `Bearer ${this.props.token}`
                }
            })
            .then(res => {
                this.setState({ viagem: res.data })
            })
            .catch(err => {
                this.props.setMensagem('Erro ao recuperar dados da viagem')
            })
        } else {
            this.props.navigation.goBack()
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Titulo titulo='Viagem Detalhada' />

                <Text style={styles.info}>Motorista: {this.state.viagem.motorista.nome}
                    </Text>
                <Text style={styles.info}>Veículo: {this.state.viagem.veiculo.nome}
                    </Text>
                { this.state.viagem.descricao ?
                    <Text style={styles.info}>Descrição sobre a viagem: {this.state.viagem.descricao}</Text>
                    : null }
                <Text style={styles.info}>Momento da saída: {functions.getDateTimeString(this.state.viagem.saida)}
                    </Text>
                <Text style={styles.info}>KM registrado na saída: {this.state.viagem.km_inicial} KM
                    </Text>
                <Text style={styles.info}>Momento da chegada: {functions.getDateTimeString(this.state.viagem.chegada)}
                    </Text>
                <Text style={styles.info}>KM registrado na chegada: {this.state.viagem.km_final} KM</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        ...commonStyles.container
    },
    info: {
        marginLeft: 10,
        marginVertical: 10
    }
})

const mapStateToProps = ({ user }) => {
    return {
        token: user.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setMensagem: msg => dispatch(setMensagem(msg))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetalharViagem)