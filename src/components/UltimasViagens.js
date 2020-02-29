import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { setMensagem } from '../store/actions/mensagem'
import { connect } from 'react-redux'
import axios from 'axios'

import ItemViagemConcluida from './ItemViagemConcluida'

class UltimasViagens extends React.Component {

    state = {
        viagens: []
    }

    componentDidMount() {
        const { navigation } = this.props
        this.focusListener = navigation.addListener('didFocus', () => {
            
            this.props.componentOk(false)
            axios.get('viagens?status=concluida')
            .then(res => {
                this.setState({ viagens: res.data })
                this.props.componentOk(true)
            })
            .catch(err => {
                this.props.set_mensagem(err)
                this.props.componentOk(true)
            })            
        })
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    render() {
        return (
            <View>
                <Text style={styles.title}>Últimas viagens finalizadas:</Text>

                {this.state.viagens.length > 0 ?
                    this.state.viagens.map(item => {return (
                        <ItemViagemConcluida viagem={item} navigation={this.props.navigation} key={item.id} />
                    )}) 
                : <Text style={styles.txtSemRegistro}>Nenhum registro encontrado</Text> }
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        set_mensagem: msg => dispatch(setMensagem(msg))
    }
}

export default connect(null, mapDispatchToProps)(UltimasViagens)

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 15
    },
    txtSemRegistro: {
        margin: 10,
        textAlign: 'center'
    }
})