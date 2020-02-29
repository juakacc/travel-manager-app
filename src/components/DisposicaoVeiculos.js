import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import axios from 'axios'
import { connect } from 'react-redux'
import { setMensagem } from '../store/actions/mensagem'

import { ScrollView } from 'react-native-gesture-handler'
import ItemViagemConcluida from './ItemViagemConcluida'

class DisposicaoVeiculos extends React.Component {

    state = {
        viagens: []
    }

    componentDidMount() {
        const { navigation } = this.props

        this.focusListener = navigation.addListener('didFocus', () => {
            this.props.onComplete(false)
            axios.get('viagens?status=nao-concluida')
            .then(res => {
                this.setState({ viagens: res.data })
                this.props.onComplete(true)
            })
            .catch(err => {
                this.props.set_mensagem(err)
                this.props.onComplete(true)
            })  
        })
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Disposição atual dos veículos:</Text>

                <ScrollView>
                {this.state.viagens.length > 0 ? 
                    this.state.viagens.map(viagem => {return (
                        <ItemViagemConcluida viagem={viagem} navigation={this.props.navigation} key={viagem.id} /> 
                    )}) 
                : 
                    <View>
                        <Text style={styles.txtSemViagem}>Nenhuma viagem em andamento</Text>
                    </View>
                }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 260
    },
    title: {
        color: '#000',
        fontFamily: 'shelter',
        fontWeight: 'bold',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10
    },
    motorista: {
        fontSize: 14,
        textAlign: 'center'
    },
    veiculo: {
        color: '#777',
        fontSize: 11,
        textAlign: 'center'
    },
    txtSemViagem: {
        marginTop: 10,
        textAlign: 'center'
    }
})

const mapDispatchToProps = dispatch => {
    return {
        set_mensagem: msg => dispatch(setMensagem(msg))
    }
}

export default connect(null, mapDispatchToProps)(DisposicaoVeiculos)