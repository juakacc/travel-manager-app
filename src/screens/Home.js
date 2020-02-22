import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Header from '../components/Header'
import DisposicaoVeiculos from '../components/DisposicaoVeiculos'
import ViagemAtual from '../components/ViagemAtual'

class Home extends React.Component {
    
    state = {
        viagem: null,
        // appState: AppState.currentState
    }

    // componentDidUpdate = prevState => {
    //     console.log(prevState.appState)
    //     console.log(this.state.appState)
    // }

    // componentDidMount() {
    //     console.log(this.state.appState)
    //     AppState.addEventListener('change', (nextAppState) => {
    //         if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
    //             console.log('App has come to the foreground!')
    //         }
    //     })
    // }

    // componentDidMount() {
    //     const { navigation } = this.props
    //     this.focusListener = navigation.addListener('didFocus', () => {
    //         console.log('Ganhou foco, executa...')
    //     });
    // }

    // componentWillUnmount() {
    //     this.focusListener.remove();
    // }

    // componentWillUnmount() {
    //     AppState.removeEventListener('focus', this._handleAppStateChange);
    // }

    // _handleAppStateChange = (nextAppState) => {
    //     if (
    //         this.state.appState.match(/inactive|background/) &&
    //         nextAppState === 'active'
    //     ) {
    //         console.log('App has come to the foreground!');
    //     }
    //     this.setState({appState: nextAppState});
    // };

    // componentDidUpdate = () => {
    //     console.log('HOME_UPDATE')
    // }

    render () {
        return (
            <View style={styles.container}>
                <Header navigation={this.props.navigation} />
                <Text style={styles.textAlert}>NÃO ULTRAPASSE EM LUGAR INDEVIDO</Text>

                <ViagemAtual navigation={this.props.navigation} />

                <DisposicaoVeiculos navigation={this.props.navigation} />
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