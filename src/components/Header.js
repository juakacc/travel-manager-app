import React from 'react'
import {View, Text, StyleSheet, Button} from 'react-native'
import functions from '../functions'

import { connect } from 'react-redux'
import { userLoggout } from '../store/actions/user'

class Header extends React.Component {

    state = {
        date: functions.getDateString()
    }

    componentDidUpdate() {
        this.setState({
            date: functions.getDateString()
        })
    }

    sair = () => {
        this.props.onLogout()
        this.props.navigation.navigate('Auth')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Text style={styles.user}>Bem vindo, {this.props.nome}</Text>
                    <Button title='SAIR' onPress={() => {this.sair()}} />
                    <Text>{ this.state.date }</Text>
                </View>
            </View>
        )
    }    
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

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(userLoggout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)