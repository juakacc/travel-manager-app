import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import comumStyles from '../styles'

import Icon from 'react-native-vector-icons/FontAwesome5'

export default props => {
    return (
        <TouchableOpacity style={[comumStyles.btn, props.style]}
            onPress={props.onPress} >
            <Text style={comumStyles.btnText}>
                {props.name ? <Icon name={props.name} size={20} /> : null} {props.title}
            </Text>
        </TouchableOpacity>
    )
}