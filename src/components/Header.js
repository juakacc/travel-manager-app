import React from 'react'
import {View, Text} from 'react-native'

export default props => {
    const date = new Date().getDate() 
    const month = new Date().getMonth() + 1
    const year = new Date().getFullYear()
    const hours = new Date().getHours()
    const min = new Date().getMinutes()

    const data = date + '/' + month + '/' + year + ' ' + hours + 'h' + min
    return (
        <View>
            <Text>Bem vindo, {props.username}</Text>
            <Text>{data}</Text>
        </View>
    )
}