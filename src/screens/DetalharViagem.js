import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import axios from 'axios'
import { connect } from 'react-redux'
import { setMensagem } from '../store/actions/mensagem'
import commonStyles from '../commonStyles'
import functions from '../functions'
import Titulo from '../components/Titulo'

import NumberFormat from 'react-number-format'

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
            await axios.get(`viagens/${idViagem}`
            // , {
            //     headers: {
            //         Authorization: `Bearer ${this.props.token}`
            //     }
            // }
            )
            .then(res => {
                this.setState({ viagem: res.data })
            })
            .catch(err => {
                this.props.setMensagem(err)
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
                <NumberFormat value={this.state.viagem.km_inicial} displayType={'text'} thousandSeparator={true}
                    renderText={value => 
                        <Text style={styles.info}>KM registrado na saída: {value} KM</Text>} 
                />
                
                { this.state.viagem.chegada ? 
                    <View>
                        <Text style={styles.info}>Momento da chegada: {functions.getDateTimeString(this.state.viagem.chegada)}</Text>
                        <NumberFormat value={this.state.viagem.km_final} displayType={'text'} thousandSeparator={true}
                            renderText={value =>
                                <Text style={styles.info}>KM registrado na chegada: {value} KM</Text>}
                        />
                        
                    </View>
                : 
                    <Text style={styles.emAndamento}>VIAGEM EM ANDAMENTO</Text>
                }
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
    },
    emAndamento: {
        marginVertical: 20,
        textAlign: 'center',
        fontWeight: 'bold'
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