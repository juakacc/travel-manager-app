import React from 'react'

import VeiculoAtual from './VeiculoAtual'
import FormSelectVeiculo from './FormSelectVeiculo'

import { connect } from 'react-redux'
import { setMensagem } from '../store/actions/mensagem'
import axios from 'axios'

class ViagemAtual extends React.Component {
    _isMounted = false

    state = {
        viagem: null,

        veiculos: []
    }

    componentDidMount() {
        this._isMounted = true
        this.focusListener = this.props.navigation.addListener('didFocus', () => {

            this.componenteOk(false)
            axios.get(`viagens/atual/${this.props.motorista.id}`)
            .then(res => {
                if (this._isMounted)
                    this.setState({ viagem: res.data })
                this.componenteOk(true)
            })
            .catch(err => {
                if (this._isMounted)
                    this.setState({ viagem: null })

                if (err.response && err.response.status != 404) {
                    this.props.set_mensagem(err)
                    this.componenteOk(true)
                } else {
                    this.loadVeiculos()
                }
            })          
        })
    }

    loadVeiculos = () => {
        axios.get('veiculos/disponiveis')
        .then(res => {
            if(this._isMounted) {
                this.setState({ veiculos: res.data })
            }
            this.componenteOk(true)
        })
        .catch(err => {
            console.log(err || '')
            this.componenteOk(true)
        })
    }

    componentWillUnmount() {
        this.focusListener.remove()
        this._isMounted = false
    }

    componenteOk = v => {
        this.props.onComplete(v)
    }

    render() {
        if (this.state.viagem) {
            return <VeiculoAtual viagem={this.state.viagem} navigation={this.props.navigation} />
        } else {
            return <FormSelectVeiculo navigation={this.props.navigation} veiculos={this.state.veiculos} />
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