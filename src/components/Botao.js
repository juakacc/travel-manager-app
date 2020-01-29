import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import comumStyles from '../styles'

export default props => {
    return (
        <TouchableOpacity style={comumStyles.btn}
            onPress={props.onPress} >
            <Text style={comumStyles.btnText}>{props.title}</Text>
        </TouchableOpacity>
    )
}