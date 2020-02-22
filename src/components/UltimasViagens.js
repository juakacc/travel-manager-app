import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { connect } from 'react-redux'
import { loadViagensConcluidas } from '../store/actions/viagem'
import ItemViagemConcluida from './ItemViagemConcluida'

class UltimasViagens extends React.Component {

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
            <View>
                <Text style={styles.title}>Últimas viagens finalizadas:</Text>

                {this.props.viagens.length > 0 ?
                this.props.viagens.map(item => {return (
                    <ItemViagemConcluida viagem={item} navigation={this.props.navigation} key={item.id} />
                )}) :
                    <Text style={styles.txtSemRegistro}>Nenhum registro encontrado</Text>
                }
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadViagens: () => dispatch(loadViagensConcluidas())
    }
}

const mapStateToProps = ({viagem}) => {
    return {
        viagens: viagem.viagens_concluidas
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UltimasViagens)

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