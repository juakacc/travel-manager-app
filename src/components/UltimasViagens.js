import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { connect } from 'react-redux'
import { loadViagensConcluidas } from '../store/actions/viagem'

class UltimasViagens extends React.Component {

    componentDidMount() {
        this.props.onLoadViagens()
    }

    render() {
        return (
            <View>
                <Text style={styles.title}>Últimas viagens finalizadas:</Text>

                {this.props.viagens.length > 0 ?
                this.props.viagens.map(item => {return (
                    <View key={item.id}>
                        <Text>{item.veiculo.nome} - {item.motorista.nome}</Text>
                    </View>
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