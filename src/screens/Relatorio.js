import React from 'react'
import {View, StyleSheet } from 'react-native'
import UltimasViagens from '../components/UltimasViagens'
import Spinner from 'react-native-loading-spinner-overlay'

import Titulo from '../components/Titulo'
import FiltroData from '../components/FiltroData'

export default class Relatorio extends React.Component {

    state = {
        componentOk: false
    }
    
    render () {
        return (
            <View style={styles.container}>
                <Spinner visible={!this.state.componentOk} />

                <Titulo titulo='Relatórios' />
                
                <UltimasViagens navigation={this.props.navigation} componentOk={v => this.setState({ componentOk: v })} />
                
                <FiltroData navigation={this.props.navigation} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    }
})