import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

import { connect } from 'react-redux'
import { loadViagensNaoConcluidas } from '../store/actions/viagem'

class DisposicaoVeiculos extends React.Component {

    componentDidMount() {
        this.props.loadViagens()
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Disposição atual dos veículos:</Text>

                {this.props.viagens.map(viagem => {
                    return (
                        <View key={viagem.id}>
                            <Text style={styles.motorista}>{viagem.motorista.apelido}</Text>
                            <Text style={styles.veiculo}>- {viagem.veiculo.nome} -</Text>
                        </View>
                    )
                })}
            </View>
        )
    }
}

const mapStateToProps = ({viagem}) => {
    return {
        viagens: viagem.viagens_nao_concluidas
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadViagens: () => dispatch(loadViagensNaoConcluidas())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisposicaoVeiculos)

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    title: {
        color: '#000',
        fontFamily: 'shelter',
        fontWeight: 'bold',
        fontSize: 14
    },
    motorista: {
        fontSize: 14
    },
    veiculo: {
        color: '#777',
        fontSize: 11
    }
})