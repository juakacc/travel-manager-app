import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import functions from '../functions'
import { connect } from 'react-redux'

const header = props => {
    
    return (
        <View style={styles.container}>
            <View style={styles.rowContainer}>
                <Text style={styles.user}>Bem vindo, {props.nome}</Text>
                <Text>{functions.getDateString()}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    user: {
        fontSize: 14
    }
})

const mapStateToProps = ({user}) => {
    return {
        nome: user.nome
    }
}

export default connect(mapStateToProps, null)(header)