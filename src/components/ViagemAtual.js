import React from 'react'

import VeiculoAtual from './VeiculoAtual'
import FormSelectVeiculo from './FormSelectVeiculo'

import { connect } from 'react-redux'
import { setMensagem } from '../store/actions/mensagem'
import axios from 'axios'

class ViagemAtual extends React.Component {

    state = {
        viagem: null
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', () => {

            this.componenteOk(false)
            axios.get(`viagens/atual/${this.props.motorista.id}`)
            .then(res => {
                this.setState({ viagem: res.data })
                this.componenteOk(true)
            })
            .catch(err => {
                this.setState({ viagem: null })
                if (err.response && err.response.status != 404) {
                    this.props.set_mensagem(err)
                } else {
                    this.componenteOk(true)
                }
            })          
        })
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    componenteOk = v => {
        this.props.onComplete(v)
    }

    render() {
        if (this.state.viagem) {
            return <VeiculoAtual viagem={this.state.viagem} navigation={this.props.navigation} />
        } else {
            return <FormSelectVeiculo navigation={this.props.navigation} componenteOk={v => this.componenteOk(v)}/>
        }
    }
}

const mapStateToProps = ({ user }) => {
    return {
        motorista: user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        set_mensagem: msg => dispatch(setMensagem(msg))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViagemAtual)