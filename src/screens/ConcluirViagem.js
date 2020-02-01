import React from 'react'
import {Text, View, StyleSheet, Alert} from 'react-native'
import {Input} from 'react-native-elements'

import Botao from '../components/Botao'
import moment from 'moment'

import { connect } from 'react-redux'
import { concluirViagem } from '../store/actions/viagem'

class ConcluirViagem extends React.Component {

    state = {
        descricao: '',
        quilometragem: 0,
        errQuilometragem: ''
    }

    isValid = viagem => {
        return this.state.errQuilometragem == '' && viagem.quilometragem > 0
    }

    concluir = () => {
        const dataAtual = moment().format('YYYY-MM-DD[T]HH:mm')
        const viagem = {
            'id': this.props.viagem.id,
            "viagem": {
                "saida": this.props.viagem.saida,
                "chegada": dataAtual,
                "descricao": this.state.descricao,
                "veiculo": {
                    "id": this.props.viagem.veiculo.id
                },
                "motorista": {
                    "id": this.props.motorista.id
                }
            },
            "quilometragem": this.state.quilometragem
        }
        if (this.isValid(viagem)) {
            this.props.onConcluirViagem(viagem)
            this.props.navigation.navigate('Home')
        } else {
            Alert.alert('Preencha os dados corretamente')
        }        
    }

    setQuilometragem = q => {
        if(isNaN(q) || q <= 0) {
            this.setState({ 
                errQuilometragem: 'Insira uma quilometragem válida!',
                quilometragem: 0
            })
        } else {
            this.setState({
                errQuilometragem: '',
                quilometragem: q
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Complete os dados a seguir sobre a viagem</Text>
                <Input
                    keyboardType='numeric'
                    label='Quilometragem'
                    placeholder='KM atual'
                    errorMessage={this.state.errQuilometragem}
                    returnKeyType='next'
                    onChangeText={a => this.setQuilometragem(a)} />
                
                <Input 
                    label='Comentário'
                    placeholder='Comentário sobre a viagem (opcional)' 
                    returnKeyType='done'
                    onChangeText={a => this.setState({ descricao: a })}/>

                <Botao onPress={() => this.concluir()}
                    title='Concluir Viagem' />
            </View>
        )
    }
}

const mapStateToProps = ({user, viagem}) => {
    console.log(viagem.viagem)
    return {
        motorista: user,
        viagem: viagem.viagem
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onConcluirViagem: viagem => dispatch(concluirViagem(viagem))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConcluirViagem)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    title: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 10
    }
})