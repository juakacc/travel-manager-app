import React from 'react'
import { connect } from 'react-redux'

import VeiculoAtual from './VeiculoAtual'
import FormSelectVeiculo from './FormSelectVeiculo'

class ViagemAtual extends React.Component {

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

export default connect(mapStateToProps, null)(ViagemAtual)