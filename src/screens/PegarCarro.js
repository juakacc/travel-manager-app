import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Header from '../components/Header'
import DisposicaoVeiculos from '../components/DisposicaoVeiculos'
import ViagemAtual from '../components/ViagemAtual'
import Botao from '../components/Botao'

import { connect } from 'react-redux'
import { login } from '../store/actions/user'
import { iniciarViagem } from '../store/actions/viagem'

class PegarCarro extends React.Component {
    _isMounted = false

    state = {
        viagem: null
    }

    componentDidMount() {
        this._isMounted = true
        if (this._isMounted)
            this.props.onLogin({id: 1})
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render () {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} />
                <Text style={styles.textAlert}>NÃO ULTRAPASSE EM LUGAR INDEVIDO</Text>

                <ViagemAtual navigation={this.props.navigation} />

                <DisposicaoVeiculos />

                <Botao onPress={() => this.props.navigation.navigate('Viagens')}
                    title='Pesquisar'/>
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
        onLogin: t => dispatch(login(t)),
        onIniciarViagem: viagem => dispatch(iniciarViagem(viagem))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PegarCarro)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    textAlert: {
        color: '#fff',
        backgroundColor: '#f00',
        padding: 5,
        margin: 2,
        borderRadius: 5,
        textAlign: 'center',
        fontWeight: "bold"
    }
})