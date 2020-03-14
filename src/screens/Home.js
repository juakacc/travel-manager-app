import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'

import Header from '../components/Header'
import DisposicaoVeiculos from '../components/DisposicaoVeiculos'
import ViagemAtual from '../components/ViagemAtual'
import GeneralStatusBarColor from '../components/GeneralStatusBarColor'

const textArray = [
    'NÃO ULTRAPASSE EM LUGAR INDEVIDO',
    'UTILIZE O CINTO DE SEGURANÇA',
    'LIGUE OS FARÓIS DO VEÍCULO'
]

class Home extends React.Component {
    
    state = {
        viagemAtual: false,
        disposicaoVeiculos: false,
        indice: 0
    }

    viagemAtual = viagemAtual => {
        this.setState({ viagemAtual })
    }

    disposicaoVeiculos = disposicaoVeiculos => {
        this.setState({ disposicaoVeiculos })
    }

    componentDidMount() {
        this.timeout = setInterval(() => {
            let indice = this.state.indice + 1;
            this.setState({ indice });
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timeout);
    }

    render () {

        const textThatChanges = textArray[this.state.indice % textArray.length]

        return (
            <View style={styles.container}>
                {/* <GeneralStatusBarColor backgroundColor="white" barStyle="dark-content"/>     */}
                
                <Header navigation={this.props.navigation} />
                <Text style={styles.textAlert}>{textThatChanges}</Text>

                <Spinner visible={! (this.state.viagemAtual && this.state.disposicaoVeiculos)} />             

                <ViagemAtual navigation={this.props.navigation} onComplete={v => this.viagemAtual(v)} />

                <DisposicaoVeiculos navigation={this.props.navigation} onComplete={v => this.disposicaoVeiculos(v)} />
            </View>
        )
    }
}

export default Home

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