import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'

import Botao from '../components/Botao'
import moment from 'moment'

import { connect } from 'react-redux'
import { concluirViagem } from '../store/actions/viagem'
import Titulo from '../components/Titulo'

class ConcluirViagem extends React.Component {

    state = {
        descricao: '',
        quilometragem: 0,
        errQuilometragem: ''
    }

    componentDidUpdate = prevProps => {
        if (prevProps.isLoading && !this.props.isLoading) {
            this.props.navigation.navigate('Viagem')
        }
    }

    isValid = () => {
        this.setState({
            errQuilometragem: ''
        })

        if(isNaN(this.state.quilometragem) || this.state.quilometragem <= 0) {
            this.setState({ 
                errQuilometragem: 'Insira uma quilometragem válida!',
                quilometragem: 0
            })
            return false
        }
        return true
    }

    concluir = () => {
        if (this.isValid()) {
            const dataAtual = moment().format('YYYY-MM-DD[T]HH:mm')

            const dados = {
                id: this.props.viagem.id,
                viagem: {
                    "saida": this.props.viagem.saida,
                    "chegada": dataAtual,
                    "descricao": this.state.descricao,
                    "km_inicial": this.props.viagem.km_inicial,
                    "km_final": this.state.quilometragem,
                    "veiculo": this.props.viagem.veiculo.id,
                    "motorista": this.props.motorista.id
                }
            }
            this.props.onConcluirViagem(dados)
        }   
    }

    render() {
        return (
            <View style={styles.container}>
                <Titulo titulo='Concluir Viagem' />
                <Text style={styles.title}>Complete os dados a seguir sobre a viagem</Text>
                <Input
                    keyboardType='numeric'
                    label='Quilometragem'
                    placeholder='KM atual'
                    errorMessage={this.state.errQuilometragem}
                    returnKeyType='next'
                    onChangeText={quilometragem => this.setState({ quilometragem })} />
                
                <Input 
                    label='Comentário'
                    placeholder='Comentário sobre a viagem (opcional)' 
                    returnKeyType='done'
                    onChangeText={descricao => this.setState({ descricao })}/>

                <Botao 
                    onPress={() => this.concluir()}
                    title='Concluir Viagem' 
                    isSubmetendo={this.props.isSubmetendo}
                    name='route' />
            </View>
        )
    }
}

const mapStateToProps = ({user, viagem}) => {
    return {
        motorista: user,
        viagem: viagem.viagem,
        isLoading: viagem.isLoading,
        isSubmetendo: viagem.isSubmetendo
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