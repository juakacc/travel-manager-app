import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { connect } from 'react-redux'
import { loadViagensNaoConcluidas } from '../store/actions/viagem'
import { ScrollView } from 'react-native-gesture-handler'
import ItemViagemConcluida from './ItemViagemConcluida'

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
                    this.props.viagens.map(viagem => {return (
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