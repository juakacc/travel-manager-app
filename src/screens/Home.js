import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

import Header from '../components/Header'
import DisposicaoVeiculos from '../components/DisposicaoVeiculos'
import ViagemAtual from '../components/ViagemAtual'
import GeneralStatusBarColor from '../components/GeneralStatusBarColor'
import commonStyles from '../commonStyles'

const textArray = [
    'NÃO ULTRAPASSE EM LUGAR INDEVIDO',
    'UTILIZE O CINTO DE SEGURANÇA',
    'LIGUE OS FARÓIS DO VEÍCULO'
]

export default class Home extends React.Component {
    _isMounted = false
    
    state = {
        viagemAtual: false,
        disposicaoVeiculos: false,
        indice: 0
    }

    viagemAtual = viagemAtual => {
        if (this._isMounted)
            this.setState({ viagemAtual })
    }

    disposicaoVeiculos = disposicaoVeiculos => {
        if (this._isMounted)
            this.setState({ disposicaoVeiculos })
    }

    componentDidMount() {
        this._isMounted = true
        this.timeout = setInterval(() => {
            if (this._isMounted) {
                let indice = this.state.indice + 1
                this.setState({ indice })
            }            
        }, 5000)
    }

    componentWillUnmount() {
        clearInterval(this.timeout)
        this._isMounted = false
    }

    render () {
        const textThatChanges = textArray[this.state.indice % textArray.length]
        const mostrarSpinner = !(this.state.viagemAtual && this.state.disposicaoVeiculos)

        return (
            <View style={styles.container}>
                <GeneralStatusBarColor backgroundColor={commonStyles.colors.secundaria} barStyle="ligth-content"/>    
                
                <Header navigation={this.props.navigation} />
                <Text style={styles.textAlert}>{textThatChanges}</Text>

                <Spinner visible={mostrarSpinner} />             

                <ViagemAtual navigation={this.props.navigation} onComplete={v => this.viagemAtual(v)} />

                <DisposicaoVeiculos navigation={this.props.navigation} onComplete={v => this.disposicaoVeiculos(v)} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    textAlert: {
        color: '#fff',
        backgroundColor: '#f00',
        padding: 5,
        margin: 2,
        borderRadius: 5,
        textAlign: 'center',
        fontWeight: "bold"
    }
})