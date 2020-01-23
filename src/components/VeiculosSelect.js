import React from 'react'
import {Picker, View, Text, StyleSheet} from 'react-native'


export default props => {
    return (
        <View style={styles.container}>
            <Text>Veículo:</Text>
            <Picker>
                <Picker.Item label='Gol02 - 40.000 KM' value='gol_01' />
                <Picker.Item label='Gol01 - 40.000 KM' value='gol_02' />
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // flexDirection: 'row'
    }
})