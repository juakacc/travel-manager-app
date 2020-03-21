import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'

import Botao from '../components/Botao'
import moment from 'moment'

import axios from 'axios'
import { connect } from 'react-redux'
import { concluirViagem } from '../store/actions/viagem'
import Titulo from '../components/Titulo'
import Spinner from 'react-native-loading-spinner-overlay'
import { setMensagem } from '../store/actions/mensagem'
import GeneralStatusBarColor from '../components/GeneralStatusBarColor'
import commonStyles from '../commonStyles'

class ConcluirViagem extends React.Component {

    state = {
        id: 0,
        saida: '',
        km_inicial: 0,
        veiculo: 0,
        motorista: 0,
        
        descricao: '',
        km_final: 0,

        errQuilometragem: ''
    }

    componentDidMount = () => {
        const id = this.props.navigation.getParam('viagemId')

        if (id) {
            axios.get(`viagens/${id}`)
            .then(res => {
                const { saida, km_inicial, descricao, veiculo, motorista } = res.data

                this.setState({
                    id,
                    saida,
                    km_inicial,
                    descricao,
                    veiculo: veiculo.id,
                    motorista: motorista.id
                })
            })
            .catch(err => {
                this.props.set_mensagem(err)
            })
        }
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

        if(isNaN(this.state.km_final) || this.state.km_final <= 0) {
            this.setState({ 
                errQuilometragem: 'Insira uma quilometragem válida!',
                km_final: 0
            })
            return false
        }
        return true
    }

    concluir = () => {
        if (this.isValid()) {
            const dataAtual = moment().format('YYYY-MM-DD[T]HH:mm')

            const dados = {
                id: this.state.id,
                viagem: {
                    saida: this.state.saida,
                    chegada: dataAtual,
                    descricao: this.state.descricao,
                    km_inicial: this.state.km_inicial,
                    km_final: this.state.km_final,
                    veiculo: this.state.veiculo,
                    motorista: this.state.motorista
                }
            }
            this.props.onConcluirViagem(dados)
        }   
    }

    render() {
        return (
            <View style={styles.container}>
                <GeneralStatusBarColor backgroundColor={commonStyles.colors.secundaria} barStyle="ligth-content"/>    
                <Spinner visible={this.props.isSubmetendo} />

                <Titulo titulo='Concluir Viagem' />
                <Text style={styles.title}>Complete os dados a seguir sobre a viagem</Text>
                
                <Input
                    keyboardType='numeric'
                    label='Quilometragem'
                    placeholder='KM atual'
                    errorMessage={this.state.errQuilometragem}
                    returnKeyType='next'
                    onChangeText={km_final => this.setState({ km_final })} />
                
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

const mapStateToProps = ({ viagem }) => {
    return {
        isLoading: viagem.isLoading,
        isSubmetendo: viagem.isSubmetendo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onConcluirViagem: viagem => dispatch(concluirViagem(viagem)),
        set_mensagem: msg => dispatch(setMensagem(msg))
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