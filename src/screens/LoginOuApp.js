import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'

export default class LoginOuApp extends React.Component {

    componentDidMount = () => {
        setTimeout(() => {
            this.props.navigation.navigate('Auth')
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