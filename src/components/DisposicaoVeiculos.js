import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import ItemViagemConcluida from './ItemViagemConcluida'

import axios from 'axios'
import { connect } from 'react-redux'
import { setMensagem } from '../store/actions/mensagem'

class DisposicaoVeiculos extends React.Component {

    state = {
        viagens: []
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {
            
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

                <FlatList 
                    data={this.state.viagens}
                    renderItem={({item}) =>
                        <ItemViagemConcluida 
                            viagem={item} 
                            navigation={this.props.navigation} /> 
                    }
                    keyExtractor={item => `${item.id}`}
                    ListEmptyComponent={<Text style={styles.txtSemViagem}>Nenhuma viagem em andamento</Text>}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 195
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