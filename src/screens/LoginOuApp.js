import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'

import { userLogged } from '../store/actions/user'
import AsyncStorage from "@react-native-community/async-storage"
import { connect } from 'react-redux'

class Splash extends React.Component {

    componentDidMount = () => {        
        setTimeout(async () => {
            const json = await AsyncStorage.getItem('userData')
            const userData = JSON.parse(json) || {}

            if (userData.token) {
                this.props.onUserLogged(userData)
                this.props.navigation.navigate('App')
            } else {
                this.props.navigation.navigate('Auth')
            }
        }, 1000)
    }

    render() {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#ff0" />
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUserLogged: user => dispatch(userLogged(user))
    }
}

export default connect(null, mapDispatchToProps)(Splash)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
      }
})