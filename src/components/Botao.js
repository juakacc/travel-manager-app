import React from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import comumStyles from '../styles'

import Icon from 'react-native-vector-icons/FontAwesome'

export default props => {
    return (
        <TouchableOpacity style={[comumStyles.btn, props.style]}
            onPress={props.onPress} >
            <Text style={comumStyles.btnText}>
                {props.name ? <Icon name={props.name} size={15} /> : null} {props.title}
            </Text>
        </TouchableOpacity>
    )
}