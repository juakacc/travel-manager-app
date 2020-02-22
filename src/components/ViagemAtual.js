import React from 'react'
import { connect } from 'react-redux'

import VeiculoAtual from './VeiculoAtual'
import FormSelectVeiculo from './FormSelectVeiculo'

import { loadViagem } from '../store/actions/viagem'

class ViagemAtual extends React.Component {

    componentDidMount() {
        const { navigation } = this.props
        this.focusListener = navigation.addListener('didFocus', () => {
            this.props.onLoadViagem()
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    render() {
        if (this.props.viagem) {
            return <VeiculoAtual viagem={this.props.viagem} navigation={this.props.navigation} />
        } else {
            return <FormSelectVeiculo navigation={this.props.navigation} />
        }
    }
}

const mapStateToProps = ({user, viagem}) => {
    return {
        motorista: user,
        viagem: viagem.viagem
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadViagem: () => dispatch(loadViagem())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViagemAtual)