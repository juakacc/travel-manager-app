import React from 'react'
import {View, StyleSheet, ScrollView } from 'react-native'
import Header from '../components/Header'
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
                <Spinner
                    visible={!this.state.componentOk}
                    textStyle={styles.spinnerTextStyle} />

                <Header />
                <Titulo titulo='Relatórios' />
                
                <ScrollView>
                    <UltimasViagens navigation={this.props.navigation} componentOk={v => this.setState({ componentOk: v })} />

                    <FiltroData navigation={this.props.navigation} />
                </ScrollView>
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