import React from 'react'
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native'
import comumStyles from '../styles'

import Icon from 'react-native-vector-icons/FontAwesome5'
import commonStyles from '../commonStyles'

export default props => {
    const s = props.style ? props.style : {}

    return (
        <TouchableOpacity style={[styles.buttonContainer, s]} onPress={props.onPress} disabled={props.isSubmetendo}>
            {props.isSubmetendo ? 
                <ActivityIndicator animating={true} size="small" color={commonStyles.colors.secundaria} />
            : 
            <Text style={comumStyles.btnText}>
                {props.name ? <Icon name={props.name} size={20} /> : null} {props.title}
            </Text>
            }                    
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: 40,
        justifyContent: 'center',
        marginVertical: 10,
        borderRadius: 15,
        backgroundColor: commonStyles.colors.principal,
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})