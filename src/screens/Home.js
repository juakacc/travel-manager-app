import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Header from '../components/Header'
import DisposicaoVeiculos from '../components/DisposicaoVeiculos'
import ViagemAtual from '../components/ViagemAtual'

import { connect } from 'react-redux'

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

export default connect(mapStateToProps)(Home)

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