import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Header from '../components/Header'
import DisposicaoVeiculos from '../components/DisposicaoVeiculos'
import ViagemAtual from '../components/ViagemAtual'
import Botao from '../components/Botao'

import { connect } from 'react-redux'
import { login } from '../store/actions/user'
import { iniciarViagem } from '../store/actions/viagem'
import { Icon } from 'react-native-vector-icons/FontAwesome'

class Home extends React.Component {
    
    state = {
        viagem: null
    }

    render () {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} />
                <Text style={styles.textAlert}>NÃO ULTRAPASSE EM LUGAR INDEVIDO</Text>

                <ViagemAtual navigation={this.props.navigation} />

                <DisposicaoVeiculos />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)

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