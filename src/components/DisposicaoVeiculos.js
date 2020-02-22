import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { connect } from 'react-redux'
import { loadViagensNaoConcluidas } from '../store/actions/viagem'
import { ScrollView } from 'react-native-gesture-handler'

class DisposicaoVeiculos extends React.Component {

    componentDidMount() {
        const { navigation } = this.props
        this.focusListener = navigation.addListener('didFocus', () => {
            this.props.onLoadViagens()
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Disposição atual dos veículos:</Text>

                <ScrollView>
                {this.props.viagens.length > 0 ? 
                    this.props.viagens.map(viagem => {
                        return (
                            <View key={viagem.id}>
                                <Text style={styles.motorista}>{viagem.motorista.apelido}</Text>
                                <Text style={styles.veiculo}>- {viagem.veiculo.nome} -</Text>
                            </View>
                        )
                    }) : 
                    <View>
                        <Text style={styles.txtSemViagem}>Todos os veículos estão disponíveis</Text>
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
        textAlign: 'center'
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

const mapStateToProps = ({viagem}) => {
    return {
        viagens: viagem.viagens_nao_concluidas
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadViagens: () => dispatch(loadViagensNaoConcluidas())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DisposicaoVeiculos)